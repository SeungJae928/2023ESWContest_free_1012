//package com.example.Domabam.service;
//
//import com.example.Domabam.domain.Provider;
//import com.example.Domabam.domain.Role;
//import com.example.Domabam.domain.User;
//import com.example.Domabam.oauth2.*;
//import com.example.Domabam.repository.JPAUserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.util.Map;
//
//@Service
//@Transactional
//public class PrincipalOAuth2UserService extends DefaultOAuth2UserService {
//
////    @Autowired
////    private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    @Autowired
//    private JPAUserRepository userRepository;
//
////    public PrincipalOAuth2UserService(UserRepository userRepository) {
////        this.userRepository = userRepository;
////    }
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
//
//        System.out.println("getClientRegistration: "+userRequest.getClientRegistration());
//        System.out.println("getAccessToken: "+userRequest.getAccessToken().getTokenValue());
//        System.out.println("getAttributes: "+ super.loadUser(userRequest).getAttributes());
//
//        OAuth2User oAuth2User = super.loadUser(userRequest);
//        OAuth2UserInfo oAuth2UserInfo = null;
//
//        if(userRequest.getClientRegistration().getRegistrationId().equals("google")) {
//            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
//        }
//        else if(userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
//            oAuth2UserInfo = new NaverUserInfo((Map)oAuth2User.getAttributes().get("response"));
//        }
//        else if(userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
//            oAuth2UserInfo = new KakaoUserInfo((Map)oAuth2User.getAttributes().get("kakao_account"), String.valueOf(oAuth2User.getAttributes().get("id")));
//        }
//        else {
//            System.out.println("지원하지 않는 서비스");
//        }
//
//        String provider = oAuth2UserInfo.getProvider();
//        Long providerId = oAuth2UserInfo.getProviderId();
//        String username = provider + "_" + providerId;
//        String password = "TEST";
////        String password = bCryptPasswordEncoder.encode("테스트");
//        String email = oAuth2UserInfo.getEmail();
//        Role role = Role.USER;
//       User userEntity = userRepository.findByName(username);
//        if(userEntity == null){
//            LocalDateTime create_date = LocalDateTime.now();
//            userEntity = User.builder()
//                    .name(username)
//                    .password(password)
//                    .email(email)
//                    .role(role)
//                    .provider(Provider.KAKAO)
//                    .id(providerId)
//                    .createDate(create_date)
//                    .build();
//            System.out.println("Build");
//            userRepository.save(userEntity);
//        }
//
//        return new PrincipalDetails(userEntity, oAuth2User.getAttributes());
//    }
//}
