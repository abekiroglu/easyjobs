package com.easyjobs.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import com.easyjobs.api.dto.request.AdvertisementCreateRequest;
import com.easyjobs.api.model.Profession;
import com.easyjobs.api.security.CustomUserDetailsService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class AdvertisementControllerTest extends AbstractTest {
    private static String uri = "/v1/advertisements/";

    private static String userToken = null;
    private static String companyToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA0NjUxMTM5ZDg4NzUyYj" +
            "Y0OTM0MjUzNGE2YjRhMDUxMjVkNzhmYmIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVGVzdCBDb21wYW55I" +
            "iwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Vhc3lqb2JzLWZjMTM2IiwiYXVkIjoiZW" +
            "FzeWpvYnMtZmMxMzYiLCJhdXRoX3RpbWUiOjE1NzU0NzE3NTAsInVzZXJfaWQiOiJnMEYyNEM1alR6T1haQjVVQT" +
            "RCRm5GWUlkbmkxIiwic3ViIjoiZzBGMjRDNWpUek9YWkI1VUE0QkZuRllJZG5pMSIsImlhdCI6MTU3NTQ3MTc1MCwiZX" +
            "hwIjoxNTc1NDc1MzUwLCJlbWFpbCI6InRlc3Rjb21wYW55QGNvbXBhbnkuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm" +
            "ZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdGNvbXBhbnlAY29tcGFueS5jb20iXX0sInNpZ25faW5fcHJvdml" +
            "kZXIiOiJwYXNzd29yZCJ9fQ.ckSKe37TWRaOlZxPPTx-TjnCCkcvWKobHBuX1TUdeTp3xkw4DdN8ju-VUJuEGnkC5ydDshCUEs0RK-f" +
            "pY6y6xqEP2wCD7TrUf1V5Zk0aDw0toMIsE1C5AEozdvKApHF7hixIBcJFKIAawkyZHHUOwO9SfFvkWs0yY_rfZtZ-XmO0gpw2VJzfRAF8J" +
            "WouTs8o_hvrRZzza76jYQZAM3Uhn811WPkjk2qIj4l9UfGEO3NO05kxCUyQEeYO4myBrKGMnvo3h5aLCYF8TJrph3hfz_rSoxozOSiDYhJwEl" +
            "KM7UluAZVKRgg_gJ3K6iPiqL281odCG1BogA0Tt5jzBvXMcw";

    @Override
    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void getProfessions() throws Exception {
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        Profession[] professions = super.mapFromJson(content, Profession[].class);
        assertTrue(professions.length > 0);
    }

    @Test
    public void createAdvertisement() throws Exception{
        AdvertisementCreateRequest request = new AdvertisementCreateRequest();
        request.setDescription("Unit Test Advertisement");
        request.setProfessionId(2);
        request.setPublishDate(new Date());
        request.setValidUntil(new Date(1764859316));

        AdvertisementCreateRequest.AssessmentWrapper requirement1 = new AdvertisementCreateRequest.AssessmentWrapper();
        requirement1.setSkillId(0);
        requirement1.setWeight(1.0);
        AdvertisementCreateRequest.AssessmentWrapper requirement2 = new AdvertisementCreateRequest.AssessmentWrapper();
        requirement2.setSkillId(2);
        requirement2.setWeight(0.7);
        AdvertisementCreateRequest.AssessmentWrapper requirement3 = new AdvertisementCreateRequest.AssessmentWrapper();
        requirement3.setSkillId(3);
        requirement3.setWeight(0.5);

        List<AdvertisementCreateRequest.AssessmentWrapper> requirements = new ArrayList<>();
        requirements.add(requirement1);
        requirements.add(requirement2);
        requirements.add(requirement3);

        request.setRequirements(requirements);


        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
                .header("auth", companyToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(super.mapToJson(request))).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
//        return service.createAdvertisement(request, authentication.getName());
    }

//    @GetMapping("/{advertisementId}")
//    public ResponseEntity getAdvertisement(@PathVariable String advertisementId, Authentication authentication){
//        return service.getAdvertisement(advertisementId, authentication.getName());
//    }
//
//    @PatchMapping("/{advertisementId}")
//    public ResponseEntity updateAdvertisement(@PathVariable String advertisementId, Authentication authentication, @RequestBody AdvertisementUpdateRequest request){
//        return service.updateAdvertisement(request, advertisementId, authentication);
//    }
//
//    @DeleteMapping("/{advertisementId}")
//    public ResponseEntity deleteAdvertisement(@PathVariable String advertisementId, Authentication authentication){
//        return service.deleteAdvertisement(advertisementId, authentication.getName());
//    }
//
//    @GetMapping("/search")
//    public ResponseEntity getAdvertisements(@RequestParam Integer id, @RequestParam Integer companyId, Authentication authentication){
//        return service.searchAdvertisements(id, companyId, authentication);
//    }
//
//    @GetMapping("/{advertisementId}/details")
//    public ResponseEntity getAdvertisementDetails(@PathVariable Integer advertisementId){
//        return service.getAdvertisementDetails(advertisementId);
//    }
//
//    @GetMapping("/{advertisementId}/apply")
//    public ResponseEntity applyForJob(@PathVariable String advertisementId, Authentication authentication){
//        return service.applyForJob(advertisementId, authentication);
//    }
//
//    @GetMapping("/{advertisementId}/recommended")
//    public ResponseEntity getRecommendedUsers(@PathVariable String advertisementId, Authentication authentication){
//        return service.getRecommendedUsers(advertisementId, authentication);
//    }
}
