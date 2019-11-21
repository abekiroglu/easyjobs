package com.easyjobs.api.integration.aws;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import com.easyjobs.api.dto.response.ErrorResponse;
import com.easyjobs.api.dto.response.Response;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@Service
public class AwsService {

    private static final String s3configPath = "aws-bucket.json";

    private AmazonS3 s3service;
    private AmazonSNS snsService;


    private static String accessKey;
    private static String secretKey;
    private static String endpointUrl;
    private static String bucketName;

    public AwsService() throws IOException, ParseException {

        JSONParser parser = new JSONParser();
        Object config = parser.parse(new FileReader(s3configPath));
        JSONObject configJson = (JSONObject) config;
        accessKey = (String) configJson.get("accessKey");
        secretKey = (String) configJson.get("secretKey");
        endpointUrl = (String) configJson.get("endpointUrl");
        bucketName = (String) configJson.get("bucketName");
    }

    @PostConstruct
    private void initializeAmazon() throws IOException, ParseException {
        AWSStaticCredentialsProvider credentials = new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey));

        this.s3service = AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.EU_CENTRAL_1)
                .withCredentials(credentials)
                .build();

        this.snsService = AmazonSNSClientBuilder
                .standard()
                .withRegion(Regions.EU_CENTRAL_1)
                .withCredentials(credentials)
                .build();
    }

    public Response uploadImage(MultipartFile mf) {
        String fileUrl;
        try {
            File file = AwsUtil.convertMultiPartToFile(mf);
            String fileName = AwsUtil.generateFileName(mf);
            fileUrl = String.format("http://%s/%s/%s", endpointUrl, bucketName, fileName);
            AwsUtil.uploadFileTos3bucket(fileName, file, this.s3service);
            file.delete();
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new Response<>(fileUrl, HttpStatus.OK);
    }

}