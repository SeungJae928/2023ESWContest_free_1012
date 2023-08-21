package com.example.Domabam.client;

import com.example.Domabam.domain.Provider;
import com.example.Domabam.domain.Role;
import com.example.Domabam.domain.User;
import com.example.Domabam.dto.KakaoUserDTO;
import com.example.Domabam.jwt.TokenValidFailedException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class ClientKakao implements ClientProxy{

    private final WebClient webClient;

    @Override
    public User getUserData(String accessToken) {
        KakaoUserDTO kakaoUserDTO = webClient.get()
                .uri("https://kapi.kakao.com/v2/user/me")
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response -> Mono.error(new TokenValidFailedException("Social Access Token is unauthorized")))
                .onStatus(HttpStatusCode::is5xxServerError, response -> Mono.error(new TokenValidFailedException("Internal Server Error")))
                .bodyToMono(KakaoUserDTO.class)
                .block();

        return User.builder()
                .provider_id(String.valueOf(kakaoUserDTO.getId()))
                .name(kakaoUserDTO.getProperties().getName())
                .email(kakaoUserDTO.getKakaoAccount().getEmail())
                .role(Role.USER)
                .createDate(LocalDateTime.now())
                .provider(Provider.KAKAO)
                .password("Test")
                .provider_id(null)
                .build();
    }
}
