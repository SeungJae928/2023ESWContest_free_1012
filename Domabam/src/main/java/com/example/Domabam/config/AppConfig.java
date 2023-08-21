package com.example.Domabam.config;

import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

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
