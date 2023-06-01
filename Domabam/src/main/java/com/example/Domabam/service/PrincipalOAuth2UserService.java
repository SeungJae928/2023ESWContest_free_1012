package com.example.Domabam.service;

import com.example.Domabam.domain.Role;
import com.example.Domabam.domain.User;
import com.example.Domabam.oauth2.GoogleUserInfo;
import com.example.Domabam.oauth2.OAuth2UserInfo;
import com.example.Domabam.oauth2.PrincipalDetails;
import com.example.Domabam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PrincipalOAuth2UserService extends DefaultOAuth2UserService {

//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{

        System.out.println("getClientRegistration: "+userRequest.getClientRegistration());
        System.out.println("getAccessToken: "+userRequest.getAccessToken().getTokenValue());
        System.out.println("getAttributes: "+ super.loadUser(userRequest).getAttributes());

        OAuth2User oAuth2User = super.loadUser(userRequest);
        OAuth2UserInfo oAuth2UserInfo = null;

        if(userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        }
        else {
            System.out.println("지원하지 않는 서비스");
        }

        String provider = oAuth2UserInfo.getProvider();
        String providerId = oAuth2UserInfo.getProviderId();
        String username = provider + " " + providerId;
        String password = "TEST";
//        String password = bCryptPasswordEncoder.encode("테스트");
        String email = oAuth2UserInfo.getEmail();
        Role role = Role.USER;

       User userEntity = userRepository.findByName(username);
        if(userEntity == null){
            LocalDateTime create_date = LocalDateTime.now();
            userEntity = User.builder()
                    .name(username)
                    .password(password)
                    .email(email)
                    .role(role)
                    .provider(provider)
                    .provider_id(providerId)
                    .createDate(create_date)
                    .build();

            userRepository.save(userEntity);
        }

        return new PrincipalDetails(userEntity, oAuth2User.getAttributes());
    }
}
