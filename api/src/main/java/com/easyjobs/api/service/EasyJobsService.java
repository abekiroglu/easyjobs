//package com.easyjobs.api.service;
//
//import com.easyjobs.api.dto.request.*;
//import com.easyjobs.api.dto.response.ErrorResponse;
//import com.easyjobs.api.dto.response.Response;
//import com.easyjobs.api.dto.response.SimpleProfession;
//import com.easyjobs.api.dto.response.SimpleUser;
//import com.easyjobs.api.dto.response.exception.ResourceNotFoundException;
//import com.easyjobs.api.integration.firebase.auth.FirebaseUtil;
//import com.easyjobs.api.integration.sendgrid.SendGridUtil;
//import com.easyjobs.api.model.*;
//import com.easyjobs.api.repository.*;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.auth.FirebaseAuth;
//import com.google.firebase.auth.FirebaseToken;
//import com.google.firebase.auth.UserRecord;
//import org.apache.http.HttpEntity;
//import org.apache.http.HttpResponse;
//import org.apache.http.NameValuePair;
//import org.apache.http.client.HttpClient;
//import org.apache.http.client.entity.UrlEncodedFormEntity;
//import org.apache.http.client.methods.HttpPost;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.message.BasicNameValuePair;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//import java.io.InputStream;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//
//@Transactional
//@Service
//public class EasyJobsService {
//    private AdvertisementRepository advertisementRepository;
//    private AssessmentRepository assessmentRepository;
//    private CommentRepository commentRepository;
//    private CompanyRepository companyRepository;
//    private ExperienceRepository experienceRepository;
//    private JobApplicationRepository jobApplicationRepository;
//    private ProfessionRepository professionRepository;
//    private SkillRepository skillRepository;
//    private UserRepository userRepository;
//    private FirebaseApp firebaseApp;
//
//    @Autowired
//    public EasyJobsService(AdvertisementRepository advertisementRepository,
//                           AssessmentRepository assessmentRepository,
//                           CommentRepository commentRepository,
//                           CompanyRepository companyRepository,
//                           ExperienceRepository experienceRepository,
//                           JobApplicationRepository jobApplicationRepository,
//                           ProfessionRepository professionRepository,
//                           SkillRepository skillRepository,
//                           UserRepository userRepository,
//                           FirebaseApp firebaseApp){
//        this.advertisementRepository = advertisementRepository;
//        this.assessmentRepository= assessmentRepository;
//        this.commentRepository= commentRepository;
//        this.companyRepository= companyRepository;
//        this.experienceRepository= experienceRepository;
//        this.jobApplicationRepository= jobApplicationRepository;
//        this.professionRepository= professionRepository;
//        this.skillRepository= skillRepository;
//        this.userRepository= userRepository;
//        this.firebaseApp = firebaseApp;
//    }
//
//    public Response signup(UserSignupRequest userSignupRequest) {
//        try {
//            //Create a request for Firebase
//            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
//                    .setEmail(userSignupRequest.getEmail())
//                    .setEmailVerified(true)
//                    .setPassword(userSignupRequest.getPassword())
//                    .setDisplayName(String.format("%s %s", userSignupRequest.getName(), userSignupRequest.getSurname()))
//                    .setDisabled(false);
//            if(userSignupRequest.getPhoneNumber() != null && userSignupRequest.getPhoneNumber().length() == 13){
//                request.setPhoneNumber(userSignupRequest.getPhoneNumber());
//            }
//            // Send request to Firebase
//            UserRecord userRecord = FirebaseAuth.getInstance(firebaseApp).createUser(request);
//            // Generate a verification link and send a verification email with SendGrid
//            String verificationLink = FirebaseAuth.getInstance(firebaseApp).generateEmailVerificationLink(userRecord.getEmail());
//            SendGridUtil.send(userRecord.getEmail(), "Activate your EasyJobs account", verificationLink);
//            // Create user entity in DB
//            User user = new User();
//            user.setProfession(professionRepository.getOne( 1));
//            user.setEmail(userSignupRequest.getEmail());
//            user.setName(userSignupRequest.getName());
//            user.setSurname(userSignupRequest.getSurname());
//            user.setValidated(false);
//            userRepository.save(user);
//
//            return new Response<>(userRecord, HttpStatus.CREATED);
//        }catch(Exception e){
//            return new Response<>(e, HttpStatus.CONFLICT, e);
//        }
//    }
//
//    public ResponseEntity getUser(String email) {
//        try{
//            return new Response<>(new SimpleUser(userRepository.findOneByEmailAndIsDeleted(email, false)), HttpStatus.OK);
//        } catch (Exception e){
//            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity getUserMe(String email) {
//        try {
//            return new Response<>(userRepository.findOneByEmail(email), HttpStatus.OK);
//        } catch (Exception e) {
//            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity updateUser(UserUpdateRequest user, String email) {
//        try {
//            User dbUser = userRepository.findOneByEmail(email);
//
//            if(user.getProfession() != null){
//                Profession profession = professionRepository.findOneById(user.getProfession());
//                if(profession != null){
//                    dbUser.setProfession(profession);
//                }else{
//                    throw new ResourceNotFoundException();
//                }
//            }
//            if(user.getDeletedComments() != null && user.getDeletedComments().size() != 0){
//                dbUser.getComments().removeAll(user.getNewComments());
//            }
//            if(user.getNewComments() != null && user.getNewComments().size() != 0){
//                dbUser.getComments().addAll(user.getNewComments());
//            }
//            if(user.getDeletedExperiences() != null && user.getDeletedExperiences().size() != 0){
//                dbUser.getExperiences().removeAll(user.getDeletedExperiences());
//            }
//            if(user.getNewExperiences() != null && user.getNewExperiences().size() != 0){
//                dbUser.getExperiences().addAll(user.getNewExperiences());
//            }
//            if(user.getDeletedSkills() != null && user.getDeletedSkills().size() != 0){
//                dbUser.getSkills().removeAll(user.getDeletedSkills());
//            }
//            if(user.getNewSkills() != null && user.getNewSkills().size() != 0){
//                dbUser.getSkills().addAll(user.getNewSkills());
//            }
//            if(user.getBirthDate() != null){
//                dbUser.setBirthDate(user.getBirthDate());
//            }
//            if(user.getName() != null){
//                dbUser.setName(user.getName());
//            }
//            if(user.getSurname() != null) {
//                dbUser.setSurname(user.getSurname());
//            }
//            return new Response<>(userRepository.save(dbUser), HttpStatus.OK);
//        } catch (Exception e) {
//            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity deleteUser(String auth) {
//        try {
//            FirebaseToken token = FirebaseUtil.decodeToken(auth);
//
//            UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(token.getUid()).setDisabled(true);
//            FirebaseAuth.getInstance(firebaseApp).updateUser(request);
//
//            User user = userRepository.findOneByEmail(token.getEmail());
//            user.setDeleted(true);
//            return new Response<>(null, HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    //TODO Firebase doesn't set the password right, figure out why
//    public ResponseEntity changePassword(ChangePasswordRequest newPassword, String auth) {
//        try {
//            FirebaseToken token = FirebaseUtil.decodeToken(auth);
//
//            HttpClient httpclient = HttpClients.createDefault();
//            HttpPost httppost = new HttpPost("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC872wZNSFlc_iBSbZsHZ1OSOi2MG8Adn4");
//
//            List<NameValuePair> params = new ArrayList<>(3);
//            params.add(new BasicNameValuePair("idToken", auth));
//            params.add(new BasicNameValuePair("password", newPassword.getNewPassword()));
//            params.add(new BasicNameValuePair("returnSecureToken", "true"));
//            httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
//
//            HttpResponse response = httpclient.execute(httppost);
//            HttpEntity entity = response.getEntity();
//
//            if (entity != null) {
//                InputStream inputstream = entity.getContent();
//                ObjectMapper mapper = new ObjectMapper();
//                Map jsonMap = mapper.readValue(inputstream, Map.class);
//                if(jsonMap.containsKey("error")){
//                    Map error = (Map) jsonMap.get("error");
//                    String code = (String) error.get("code");
//                    String message = (String) error.get("message");
//                    return new Response<>(new ErrorResponse(code, message), HttpStatus.INTERNAL_SERVER_ERROR);
//                }else{
//                    return new Response<>(userRepository.findOneByEmail(token.getEmail()), HttpStatus.OK);
//                }
//            }
//        } catch (Exception e) {
//            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//        return null;
//    }
//
//    public ResponseEntity passwordReset(String userIdentifier) {
//        //TODO not decided on whose task this is (front-end vs back-end)
//        return new Response<>("{TODO}", HttpStatus.OK);
//    }
//
//    public ResponseEntity registerCompany(CompanySignupRequest request) {
//        try {
//            //Create a request for Firebase
//            UserRecord.CreateRequest firebaseRequest = new UserRecord.CreateRequest()
//                    .setEmail(request.getEmail())
//                    .setEmailVerified(true)
//                    .setPassword(request.getPassword())
//                    .setDisplayName(request.getName())
//                    .setDisabled(false);
//            // Send request to Firebase
//            UserRecord companyRecord = FirebaseAuth.getInstance(firebaseApp).createUser(firebaseRequest);
//            // Generate a verification link and send a verification email with SendGrid
//            String verificationLink = FirebaseAuth.getInstance(firebaseApp).generateEmailVerificationLink(companyRecord.getEmail());
//            //TODO email structure instead of passing verification link
//            SendGridUtil.send(companyRecord.getEmail(), "Activate your EasyJobs account", verificationLink);
//            // Create user entity in DB
//            Company company = new Company();
//            company.setEmail(request.getEmail());
//            company.setValidated(false);
//            companyRepository.save(company);
//            return new Response<>(companyRecord, HttpStatus.CREATED);
//        }catch(Exception e){
//            return new Response<>(e, HttpStatus.CONFLICT, e);
//        }
//    }
//
//    public ResponseEntity getCompanyMe(String email) {
//        try {
//            return new Response<>(companyRepository.findOneByEmail(email), HttpStatus.OK);
//        } catch (Exception e) {
//            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity getCompanyProfile(String companyId) {
//        return new Response<>(companyRepository.findOneByIdAndIsDeleted(Integer.parseInt(companyId), false), HttpStatus.OK);
//    }
//
//    public ResponseEntity updateCompany(CompanyUpdateRequest companyUpdateRequest, String email) {
//        try {
//            Company dbCompany = companyRepository.findOneByEmail(email);
//
//            if(companyUpdateRequest.getDescription() != null){
//                dbCompany.setDescription(companyUpdateRequest.getDescription());
//            }
//            if(companyUpdateRequest.getFoundedDate() != null){
//                dbCompany.setFoundedDate(companyUpdateRequest.getFoundedDate());
//            }
//            if(companyUpdateRequest.getName() != null){
//                dbCompany.setName(companyUpdateRequest.getName());
//            }
//
//            return new Response<>(companyRepository.save(dbCompany), HttpStatus.OK);
//        } catch (Exception e) {
//            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity deleteCompany(String auth) {
//        try {
//
//            FirebaseToken token = FirebaseUtil.decodeToken(auth);
//
//            UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(token.getUid()).setDisabled(true);
//            FirebaseAuth.getInstance(firebaseApp).updateUser(request);
//
//            Company company = companyRepository.findOneByEmail(token.getEmail());
//            company.setDeleted(true);
//
//            return new Response<>(null, HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity createAdvertisement(Advertisement advertisement, String email) {
//        try {
//            advertisement.setCompany(companyRepository.findOneByEmail(email));
//            advertisement.setProfession(professionRepository.findOneById(advertisement.getProfession().getId()));
//            return new Response<>(advertisementRepository.save(advertisement), HttpStatus.CREATED);
//        }catch (Exception e) {
//            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity getAdvertisement(String advertisementId, String email) {
//        Advertisement advertisement = advertisementRepository.findOneById(Integer.parseInt(advertisementId));
//        try {
//            if(email.equalsIgnoreCase(advertisement.getCompany().getEmail())) {
//                return new Response<>(advertisement, HttpStatus.OK);
//            } else {
//                return new Response<>(new ErrorResponse("500", "Advertisement does not belong to the authenticated company"), HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//        }catch (Exception e) {
//            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity updateAdvertisement(Advertisement advertisement, String advertisementId, String email) {
//        Advertisement dbAdvertisement = advertisementRepository.findOneById(Integer.parseInt(advertisementId));
//        try {
//            if(email.equalsIgnoreCase(advertisement.getCompany().getEmail())) {
//                dbAdvertisement.setDescription(advertisement.getDescription());
//                dbAdvertisement.setRequirements(advertisement.getRequirements());
//                dbAdvertisement.setValidUntil(advertisement.getValidUntil());
//                return new Response<>(advertisementRepository.save(dbAdvertisement), HttpStatus.OK);
//            } else {
//                return new Response<>(new ErrorResponse("500", "Advertisement does not belong to the authenticated company"), HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//        }catch (Exception e) {
//            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity deleteAdvertisement(String advertisementId, String email) {
//        Advertisement advertisement = advertisementRepository.findOneById(Integer.parseInt(advertisementId));
//        try {
//            if(email.equalsIgnoreCase(advertisement.getCompany().getEmail())) {
//                advertisement.setDeleted(true);
//                advertisementRepository.save(advertisement);
//                return new Response<>(null, HttpStatus.NO_CONTENT);
//            } else {
//                return new Response<>(new ErrorResponse("500", "Advertisement does not belong to the authenticated company"), HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//        }catch (Exception e) {
//            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity searchAdvertisements(Integer id, Integer companyId, String email) {
//        try {
//            if (companyId != null && id != null) {
//                return new Response<>(new ErrorResponse("409", "Too many parameters"), HttpStatus.CONFLICT);
//            }else if(id != null) {
//                return new Response<>(advertisementRepository.findOneById(id), HttpStatus.OK);
//            }else if(companyId != null) {
//                return new Response<>(companyRepository.findOneById(companyId).getAdvertisements(), HttpStatus.OK);
//            }else {
//                List<Advertisement> advertisements = userRepository.findOneByEmail(email).getProfession().getAdvertisements();
//                return new Response<>(advertisements, HttpStatus.OK);
//            }
//        }catch (Exception e) {
//            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity getAdvertisementDetails(Integer advertisementId) {
//        try {
//            return new Response<>(advertisementRepository.findOneById(advertisementId), HttpStatus.OK);
//        }catch (Exception e) {
//            return new Response<>(new ErrorResponse("0", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity applyForJob(String advertisementId) {
//        try {
//            return null;
//        }catch (Exception e) {
//            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity hireAUser(String advertisementId, String auth) {
//        try {
//            return null;
//        }catch (Exception e) {
//            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity getRecommendedUsers(String advertisementId, String auth) {
//        try {
//            return null;
//        }catch (Exception e) {
//            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public ResponseEntity getProfessions() {
//        List<Profession> professions = professionRepository.findAll();
//        List<SimpleProfession> response = professions.stream().map(SimpleProfession::new).collect(Collectors.toList());
//       return new Response<>(response, HttpStatus.OK);
//    }
//
//
////    public Response verifyEmail(){
////        return null;
////    }
//
////    public Response login(LoginRequest loginRequest) {
////        try{
////        HttpClient httpclient = HttpClients.createDefault();
////        HttpPost httppost = new HttpPost("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC872wZNSFlc_iBSbZsHZ1OSOi2MG8Adn4");
////
////        List<NameValuePair> params = new ArrayList<>(3);
////        params.add(new BasicNameValuePair("email", loginRequest.getEmail()));
////        params.add(new BasicNameValuePair("password", loginRequest.getPassword()));
////        params.add(new BasicNameValuePair("returnSecureToken", "true"));
////        httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
////
////        HttpResponse response = httpclient.execute(httppost);
////        HttpEntity entity = response.getEntity();
////
////        if (entity != null) {
////            try (InputStream instream = entity.getContent()) {
////                ObjectMapper mapper = new ObjectMapper();
////                Map<String, Object> jsonMap = mapper.readValue(instream, Map.class);
////            } catch (IOException e1) {
////                e1.printStackTrace();
////            }
////        }
////        } catch (UnsupportedEncodingException e1) {
////            e1.printStackTrace();
////        } catch (ClientProtocolException e1) {
////            e1.printStackTrace();
////        } catch (IOException e1) {
////            e1.printStackTrace();
////        }
////        return null;
////    }
//
//
//}
