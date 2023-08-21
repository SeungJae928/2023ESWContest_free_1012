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

@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    @Autowired
    private JPAUserRepository jpaUserRepository;
    private final ClientKakao clientKakao;
    private final AuthTokenProvider authTokenProvider;

    @Transactional
    public AuthResponseDTO login(AuthRequestDTO authRequest) {
        User kakaoUser = clientKakao.getUserData(authRequest.getAccessToken());
        String provider_id = kakaoUser.getProvider_id();
        User user = jpaUserRepository.findByProviderID(provider_id);

        AuthToken authToken = authTokenProvider.createUserAppToken(provider_id);

        if (user == null) {
            jpaUserRepository.save(kakaoUser);
        }

        return AuthResponseDTO.builder()
                .appToken(authToken.getToken())
                .build();
    }

}
