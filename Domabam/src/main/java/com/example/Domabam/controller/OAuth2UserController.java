package com.example.Domabam.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "OAuth2UserAPI", description = "OAuth2와 Spring Security를 이용한 소셜 로그인 API")
@Controller
public class OAuth2UserController {

    @GetMapping("/login")
    public String loginForm(){
        System.out.println("Login Form");
        return "loginForm";
    }

    @GetMapping("/success")
    public String loginSuccess(){
        System.out.println("success");
        return "success";
    }
}
