package com.example.Domabam.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "OAuth2UserAPI", description = "OAuth2와 Spring Security를 이용한 소셜 로그인 API")
@RestController
public class OAuth2UserController {

    @GetMapping("/loginForm")
    public String loginForm(){
        return "loginForm";
    }
}
