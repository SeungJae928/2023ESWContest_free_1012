package com.example.Domabam.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "manage User Data", description = "유저 데이터 관리")
@RestController
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class UserController {

    @GetMapping("/api/user/login/success")
    public void getUserID() {
        System.out.println("success");
    }

}
