package com.easyjobs.api.service;

import com.easyjobs.api.dto.request.CompanySignupRequest;
import com.easyjobs.api.dto.request.UserSignupRequest;
import com.easyjobs.api.dto.response.ErrorResponse;
import com.easyjobs.api.dto.response.Response;
import com.easyjobs.api.integration.firebase.auth.FirebaseUtil;
import com.easyjobs.api.integration.sendgrid.SendGridUtil;
import com.easyjobs.api.model.*;
import com.easyjobs.api.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Transactional
@Service
public class EasyJobsService {
    private AdvertisementRepository advertisementRepository;
    private AssessmentRepository assessmentRepository;
    private CommentRepository commentRepository;
    private CompanyRepository companyRepository;
    private ExperienceRepository experienceRepository;
    private JobApplicationRepository jobApplicationRepository;
    private ProfessionRepository professionRepository;
    private SkillRepository skillRepository;
    private UserRepository userRepository;
    private FirebaseApp firebaseApp;

    @Autowired
    public EasyJobsService(AdvertisementRepository advertisementRepository,
                           AssessmentRepository assessmentRepository,
                           CommentRepository commentRepository,
                           CompanyRepository companyRepository,
                           ExperienceRepository experienceRepository,
                           JobApplicationRepository jobApplicationRepository,
                           ProfessionRepository professionRepository,
                           SkillRepository skillRepository,
                           UserRepository userRepository,
                           FirebaseApp firebaseApp){
        this.advertisementRepository = advertisementRepository;
        this.assessmentRepository= assessmentRepository;
        this.commentRepository= commentRepository;
        this.companyRepository= companyRepository;
        this.experienceRepository= experienceRepository;
        this.jobApplicationRepository= jobApplicationRepository;
        this.professionRepository= professionRepository;
        this.skillRepository= skillRepository;
        this.userRepository= userRepository;
        this.firebaseApp = firebaseApp;
    }

    public Response signup(UserSignupRequest userSignupRequest) {
        try {
            //Create a request for Firebase
            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                    .setEmail(userSignupRequest.getEmail())
                    .setEmailVerified(false)
                    .setPassword(userSignupRequest.getPassword())
                    .setDisplayName(String.format("%s %s", userSignupRequest.getName(), userSignupRequest.getSurname()))
                    .setDisabled(false);
            if(userSignupRequest.getPhoneNumber() != null && userSignupRequest.getPhoneNumber().length() == 13){
                request.setPhoneNumber(userSignupRequest.getPhoneNumber());
            }
            // Send request to Firebase
            UserRecord userRecord = FirebaseAuth.getInstance(firebaseApp).createUser(request);
            // Generate a verification link and send a verification email with SendGrid
            String verificationLink = FirebaseAuth.getInstance(firebaseApp).generateEmailVerificationLink(userRecord.getEmail());
            //TODO email structure instead of passing verification link
            SendGridUtil.send(userRecord.getEmail(), "Activate your EasyJobs account", verificationLink);
            // Create user entity in DB
            User user = new User();
            user.setProfession(professionRepository.getOne( 1));
            user.setEmail(userSignupRequest.getEmail());
            user.setName(userSignupRequest.getName());
            user.setSurname(userSignupRequest.getSurname());
            user.setValidated(false);
            userRepository.save(user);

            return new Response<>(userRecord, HttpStatus.CREATED);
        }catch(Exception e){
            return new Response<>(e, HttpStatus.CONFLICT, e);
        }
    }

    public ResponseEntity createUserProfile(User userProfile) {
        return new Response<>(userRepository.save(userProfile), HttpStatus.CREATED);
    }

    public ResponseEntity getUser(String email) {
        return new Response<>(userRepository.findOneByEmail(email), HttpStatus.OK);
    }

    public ResponseEntity getUserMe(String auth) {
        try {
            return new Response<>(userRepository.findOneByEmail(FirebaseUtil.decodeToken(auth).getEmail()), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity updateUser(User user, String auth) {
        try {
            FirebaseToken token = FirebaseUtil.decodeToken(auth);
            //TODO Field checks, picture update
            UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(token.getUid())
                    .setEmail(user.getEmail())
                    .setDisplayName(String.format("%s %s", user.getName(), user.getSurname()));
            UserRecord userRecord = FirebaseAuth.getInstance().updateUser(request);
            User dbUser = userRepository.findOneByEmail(token.getEmail());
            dbUser.setName(user.getName());
            dbUser.setEmail(user.getEmail());
            dbUser.setSurname(user.getSurname());
            dbUser.setSkills(user.getSkills());
            if(user.getProfession().getId() != dbUser.getProfession().getId()){
            dbUser.setProfession(professionRepository.getOne(user.getProfession().getId()));
            }
            return new Response<>(userRepository.save(user), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity deleteUser(String auth) {
        try {
            User user = userRepository.findOneByEmail(FirebaseUtil.decodeToken(auth).getEmail());
            user.setDeleted(true);
            return new Response<>(null, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity changePassword(String newPassword, String auth) {
        try {
            FirebaseToken token = FirebaseUtil.decodeToken(auth);

            HttpClient httpclient = HttpClients.createDefault();
            HttpPost httppost = new HttpPost("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC872wZNSFlc_iBSbZsHZ1OSOi2MG8Adn4");

            List<NameValuePair> params = new ArrayList<>(3);
            params.add(new BasicNameValuePair("idToken", auth));
            params.add(new BasicNameValuePair("password", newPassword));
            params.add(new BasicNameValuePair("returnSecureToken", "true"));
            httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));

            HttpResponse response = httpclient.execute(httppost);
            HttpEntity entity = response.getEntity();

            if (entity != null) {
                InputStream inputstream = entity.getContent();
                ObjectMapper mapper = new ObjectMapper();
                Map jsonMap = mapper.readValue(inputstream, Map.class);
                if(jsonMap.containsKey("error")){
                    Map error = (Map) jsonMap.get("error");
                    String code = (String) error.get("code");
                    String message = (String) error.get("message");
                    return new Response<>(new ErrorResponse(code, message), HttpStatus.INTERNAL_SERVER_ERROR);
                }else{
                    return new Response<>(userRepository.findOneByEmail(token.getEmail()), HttpStatus.OK);
                }
            }
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return null;
    }

    public ResponseEntity passwordReset(String userIdentifier) {
        //TODO not decided on whose task this is (front-end vs back-end)
        return new Response<>("{TODO}", HttpStatus.OK);
    }

    public ResponseEntity registerCompany(CompanySignupRequest request) {
        try {
            //Create a request for Firebase
            UserRecord.CreateRequest firebaseRequest = new UserRecord.CreateRequest()
                    .setEmail(request.getEmail())
                    .setEmailVerified(true)
                    .setPassword(request.getPassword())
                    .setDisplayName(request.getName())
                    .setDisabled(false);
            // Send request to Firebase
            UserRecord companyRecord = FirebaseAuth.getInstance(firebaseApp).createUser(firebaseRequest);
            // Generate a verification link and send a verification email with SendGrid
            String verificationLink = FirebaseAuth.getInstance(firebaseApp).generateEmailVerificationLink(companyRecord.getEmail());
            //TODO email structure instead of passing verification link
            SendGridUtil.send(companyRecord.getEmail(), "Activate your EasyJobs account", verificationLink);
            // Create user entity in DB
            Company company = new Company();
            company.setEmail(request.getEmail());
            company.setValidated(false);
            companyRepository.save(company);
            return new Response<>(companyRecord, HttpStatus.CREATED);
        }catch(Exception e){
            return new Response<>(e, HttpStatus.CONFLICT, e);
        }
    }

    public ResponseEntity createCompanyProfile(Company companyProfile) {
        return new Response<>(companyRepository.save(companyProfile), HttpStatus.CREATED);
    }

    public ResponseEntity getCompanyMe(String auth) {
        try {
            return new Response<>(companyRepository.findOneByEmail(FirebaseUtil.decodeToken(auth).getEmail()), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getCompanyProfile(String companyId) {
        return new Response<>(companyRepository.findOneById(Integer.parseInt(companyId)), HttpStatus.OK);
    }

    public ResponseEntity updateCompany(Company company, String auth) {
        try {
            FirebaseToken token = FirebaseUtil.decodeToken(auth);
            //TODO Field checks, picture update
            UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(token.getUid())
                    .setEmail(company.getEmail());
            UserRecord companyRecord = FirebaseAuth.getInstance().updateUser(request);
            Company dbCompany = companyRepository.findOneByEmail(token.getEmail());
            return new Response<>(companyRepository.save(company), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity deleteCompany(String auth) {
        try {
            Company company = companyRepository.findOneByEmail(FirebaseUtil.decodeToken(auth).getEmail());
            company.setDeleted(true);
            return new Response<>(null, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity createAdvertisement(Advertisement advertisement, String auth) {
        try {
            advertisement.setCompany(companyRepository.findOneByEmail(FirebaseUtil.decodeToken(auth).getEmail()));
            advertisement.setProfession(professionRepository.findOneById(advertisement.getProfession().getId()));
            return new Response<>(advertisementRepository.save(advertisement), HttpStatus.CREATED);
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getAdvertisement(String advertisementId, String auth) {
        Advertisement advertisement = advertisementRepository.findOneById(Integer.parseInt(advertisementId));
        try {
            if(FirebaseUtil.decodeToken(auth).getEmail().equalsIgnoreCase(advertisement.getCompany().getEmail())) {
                return new Response<>(advertisement, HttpStatus.OK);
            } else {
                return new Response<>(new ErrorResponse("500", "Advertisement does not belong to the authenticated company"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity updateAdvertisement(Advertisement advertisement, String advertisementId, String auth) {
        Advertisement dbAdvertisement = advertisementRepository.findOneById(Integer.parseInt(advertisementId));
        try {
            if(FirebaseUtil.decodeToken(auth).getEmail().equalsIgnoreCase(advertisement.getCompany().getEmail())) {
                dbAdvertisement.setDescription(advertisement.getDescription());
                dbAdvertisement.setRequirements(advertisement.getRequirements());
                dbAdvertisement.setValidUntil(advertisement.getValidUntil());
                return new Response<>(advertisementRepository.save(dbAdvertisement), HttpStatus.OK);
            } else {
                return new Response<>(new ErrorResponse("500", "Advertisement does not belong to the authenticated company"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity deleteAdvertisement(String advertisementId, String auth) {
        Advertisement advertisement = advertisementRepository.findOneById(Integer.parseInt(advertisementId));
        try {
            if(FirebaseUtil.decodeToken(auth).getEmail().equalsIgnoreCase(advertisement.getCompany().getEmail())) {
                advertisement.setDeleted(true);
                advertisementRepository.save(advertisement);
                return new Response<>(null, HttpStatus.NO_CONTENT);
            } else {
                return new Response<>(new ErrorResponse("500", "Advertisement does not belong to the authenticated company"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity searchAdvertisements(Integer id, Integer companyId, String auth) {
        try {
            if (companyId != null && id != null) {
                return new Response<>(new ErrorResponse("409", "Too many parameters"), HttpStatus.CONFLICT);
            }else if(id != null) {
                return new Response<>(advertisementRepository.findOneById(id), HttpStatus.OK);
            }else if(companyId != null) {
                return new Response<>(companyRepository.findOneById(companyId).getAdvertisements(), HttpStatus.OK);
            }else {
                List<Advertisement> advertisements = userRepository.findOneByEmail(FirebaseUtil.decodeToken(auth).getEmail()).getProfession().getAdvertisements();
                return new Response<>(advertisements, HttpStatus.OK);
            }
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getAdvertisementDetails(Integer advertisementId) {
        try {
            return new Response<>(advertisementRepository.findOneById(advertisementId), HttpStatus.OK);
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("0", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity applyForJob(String advertisementId) {
        try {
            return null;
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity hireAUser(String advertisementId, String auth) {
        try {
            return null;
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getRecommendedUsers(String advertisementId, String auth) {
        try {
            return null;
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


//    public Response verifyEmail(){
//        return null;
//    }

//    public Response login(LoginRequest loginRequest) {
//        try{
//        HttpClient httpclient = HttpClients.createDefault();
//        HttpPost httppost = new HttpPost("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC872wZNSFlc_iBSbZsHZ1OSOi2MG8Adn4");
//
//        List<NameValuePair> params = new ArrayList<>(3);
//        params.add(new BasicNameValuePair("email", loginRequest.getEmail()));
//        params.add(new BasicNameValuePair("password", loginRequest.getPassword()));
//        params.add(new BasicNameValuePair("returnSecureToken", "true"));
//        httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
//
//        HttpResponse response = httpclient.execute(httppost);
//        HttpEntity entity = response.getEntity();
//
//        if (entity != null) {
//            try (InputStream instream = entity.getContent()) {
//                ObjectMapper mapper = new ObjectMapper();
//                Map<String, Object> jsonMap = mapper.readValue(instream, Map.class);
//            } catch (IOException e1) {
//                e1.printStackTrace();
//            }
//        }
//        } catch (UnsupportedEncodingException e1) {
//            e1.printStackTrace();
//        } catch (ClientProtocolException e1) {
//            e1.printStackTrace();
//        } catch (IOException e1) {
//            e1.printStackTrace();
//        }
//        return null;
//    }


}
