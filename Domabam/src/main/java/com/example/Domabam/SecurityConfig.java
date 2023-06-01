package com.example.Domabam;

import com.example.Domabam.service.PrincipalOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private PrincipalOAuth2UserService principalOauthUserService;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeHttpRequests()
                .requestMatchers("/user/**").authenticated()
                .requestMatchers("/manager/**").hasAuthority("MANAGER")
                .requestMatchers("/admin/**").hasAuthority("ADMIN")
                .anyRequest().permitAll()

                .and()
                .formLogin()
                .loginPage("/loginForm") //미인증자일경우 해당 uri를 호출
                .loginProcessingUrl("/login") //login 주소가 호출되면 시큐리티가 낚아 채서(post로 오는것) 대신 로그인 진행 -> 컨트롤러를 안만들어도 된다.
                .defaultSuccessUrl("/")

                .and()
                .oauth2Login()
                .loginPage("/loginForm")
                .defaultSuccessUrl("/")
                .userInfoEndpoint()
                .userService(principalOauthUserService);

        return http.build();
    }

}
