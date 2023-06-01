package com.example.Domabam.repository;

import com.example.Domabam.domain.User;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
public class JPAOAuth2UserRepository implements UserRepository {

    private final EntityManager em;

    public JPAOAuth2UserRepository(EntityManager em) {
        this.em = em;
    }


    @Override
    public User findById(String id) {
        User user = em.find(User.class, id);
        return user;
    }

    @Override
    public User findByName(String name) {
        User user = em.find(User.class, name);
        return user;
    }

    @Override
    public void save(User user) {
        System.out.println("Hello");
        em.persist(user);
    }
}
