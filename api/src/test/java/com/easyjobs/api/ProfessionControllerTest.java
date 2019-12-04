package com.easyjobs.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import com.easyjobs.api.model.Profession;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


public class ProfessionControllerTest extends AbstractTest {
    private static String uri = "/v1/professions/";

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
}
