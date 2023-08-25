package com.example.Domabam.jwt;

import org.springframework.boot.json.BasicJsonParser;
import org.springframework.boot.json.JsonParser;

import java.util.Base64;
import java.util.Map;

public class JwtDecoder {

    public static String getPayload(String jwt) {
        String payload = jwt.split("\\.")[1];
        return payload;
    }

    public static String getUserID(String payload) {
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String data = new String(decoder.decode(payload));
        JsonParser jsonParser = new BasicJsonParser();
        Map<String, Object> jsonArr = jsonParser.parseMap(data);

        if(!jsonArr.containsKey("sub")) {
            System.out.println("유효하지 않은 토큰"); //추후에 Exception 처리
        }

        return jsonArr.get("sub").toString();
    }

}
