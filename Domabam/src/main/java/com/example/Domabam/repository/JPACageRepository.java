package com.example.Domabam.repository;

import com.example.Domabam.domain.Cage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface JPACageRepository extends JpaRepository<Cage, Long> {
    Optional<Cage> findById(Long id);

    @Transactional
    @Query(value = "SELECT c.serial FROM cage c WHERE c.user_id = :user_id", nativeQuery = true)
    String findSerialByUserId(Long user_id);
}
