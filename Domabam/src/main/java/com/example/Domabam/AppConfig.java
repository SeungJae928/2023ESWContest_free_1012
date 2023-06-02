package com.example.Domabam;

import com.example.Domabam.repository.JPAOAuth2UserRepository;
import com.example.Domabam.repository.JPAUserRepository;
import com.example.Domabam.service.PrincipalOAuth2UserService;
import com.example.Domabam.service.PrincipalService;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.parameters.P;

@Configuration
public class AppConfig {

    private EntityManager em;

    @Autowired
    public AppConfig(EntityManager em){
        this.em = em;
    }

//    @Bean
//    public PrincipalOAuth2UserService principalOAuth2UserService() {
//        return new PrincipalOAuth2UserService();
//    }

//    @Bean
//    public PrincipalService principalService() {
//        return new PrincipalService(jpaoAuth2UserRepository());
//    }

//    @Bean
//    public JPAOAuth2UserRepository jpaoAuth2UserRepository() {
//        return new JPAOAuth2UserRepository(em);
//    }
}
