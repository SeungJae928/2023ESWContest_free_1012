package com.example.Domabam.service;

import com.example.Domabam.domain.User;
import com.example.Domabam.oauth2.PrincipalDetails;
import com.example.Domabam.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("pr");
        User user = userRepository.findById(username);
        if(user != null){
            return new PrincipalDetails(user);
        }
        return null;
    }
}
