package com.example.Domabam.repository;

import com.example.Domabam.domain.Temperature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface JPATempRepository extends JpaRepository<Temperature, Long> {

    @Transactional
    @Query(value = "SELECT t.temperature FROM temperature t WHERE t.userID = :userId", nativeQuery = true)
    List<Integer> findTempByUserID(Long userId);

    List<Temperature> findByUserID(Long userid);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM temperature t WHERE t.userID = :userId ORDER BY t.obtained_time ASC limit 1", nativeQuery = true)
    void deleteByUserid(@Param(value = "userId") Long userId);
}
