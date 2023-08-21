package com.example.Domabam.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KakaoUserDTO {

    private Long id;
    private Properties properties;
    private KakaoAccount kakaoAccount;

    @ToString
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Properties {
        private String name;
//        private String profileImage;
    }

    @ToString
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class KakaoAccount {
        private String email;
//        private String gender;
    }

}
