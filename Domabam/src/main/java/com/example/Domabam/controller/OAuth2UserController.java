package com.example.Domabam.controller;

import com.example.Domabam.dto.ApiResponseDTO;
import com.example.Domabam.dto.AuthRequestDTO;
import com.example.Domabam.dto.AuthResponseDTO;
import com.example.Domabam.jwt.AuthToken;
import com.example.Domabam.jwt.AuthTokenProvider;
import com.example.Domabam.jwt.JwtHeaderUtil;
import com.example.Domabam.service.AuthService;
import com.example.Domabam.service.KakaoAuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Tag(name = "OAuth2UserAPI", description = "OAuth2와 Spring Security를 이용한 소셜 로그인 API")
@RestController
@Slf4j
@RequestMapping(value = "/auth")
@RequiredArgsConstructor
public class OAuth2UserController {

    private final KakaoAuthService kakaoAuthService;
//    private final GoogleAuthService googleAuthService;
    private final AuthTokenProvider authTokenProvider;

    private final AuthService authService;

    // 카카오 로그인
    @PostMapping(value = "/kakao")
    public ResponseEntity<AuthResponseDTO> kakaoAuthRequest(@RequestBody AuthRequestDTO authRequest){
        return ApiResponseDTO.success(kakaoAuthService.login(authRequest));
    }

    @GetMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refreshToken (HttpServletRequest request) {
        String appToken = JwtHeaderUtil.getAccessToken(request);
        AuthToken authToken = authTokenProvider.convertAuthToken(appToken);
        if (!authToken.validate()) { // 형식에 맞지 않는 token
            return ApiResponseDTO.forbidden(null);
        }

        AuthResponseDTO authResponse = authService.updateToken(authToken);
        if (authResponse == null) { // token 만료
            return ApiResponseDTO.forbidden(null);
        }
        return ApiResponseDTO.success(authResponse);
    }
}
