package com.example.Domabam.repository;

import com.example.Domabam.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository {
    public User findById(String id);
    public User findByName(String name);
    public void save(User user);
}
