package com.example.Domabam.oauth2;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo{

    private Map<String, Object> attributes;

    private String id;

    public KakaoUserInfo(Map<String, Object> attributes, String id){
        this.attributes = attributes;
        this.id = id;
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getProviderId() {
        return id;
    }

    @Override
    public String getEmail() {
        return String.valueOf(attributes.get("email"));
    }

    @Override
    public String getName() {
        return null;
    }
}
