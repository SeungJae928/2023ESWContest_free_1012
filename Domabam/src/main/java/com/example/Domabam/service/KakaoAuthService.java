package com.example.Domabam.service;

import com.example.Domabam.client.ClientKakao;
import com.example.Domabam.domain.User;
import com.example.Domabam.dto.AuthRequestDTO;
import com.example.Domabam.dto.AuthResponseDTO;
import com.example.Domabam.jwt.AuthToken;
import com.example.Domabam.jwt.AuthTokenProvider;
import com.example.Domabam.repository.JPAUserRepository;
import com.nimbusds.oauth2.sdk.ciba.AuthRequestID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    @Autowired
    private JPAUserRepository jpaUserRepository;
    private final ClientKakao clientKakao;
    private final AuthTokenProvider authTokenProvider;

    @Transactional
    public AuthResponseDTO login(AuthRequestDTO authRequest) throws IOException {
        User kakaoUser = clientKakao.getUserData(authRequest.getAccessToken());
        Long id = kakaoUser.getId();
        User user = jpaUserRepository.findById_(id);

        AuthToken authToken = authTokenProvider.createUserAppToken(id);

        if (user == null) {
            jpaUserRepository.save(kakaoUser);
        }

        return AuthResponseDTO.builder()
                .appToken(authToken.getToken())
                .build();
    }

}
