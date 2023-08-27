package com.example.Domabam.repository;

import com.example.Domabam.domain.Humidity;
import com.example.Domabam.domain.Temperature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface JPAHumidRepository extends JpaRepository<Humidity, Long> {

    @Transactional
    @Query(value = "SELECT h.humidity FROM humidity h WHERE h.cage_id = :cage_id", nativeQuery = true)
    List<Integer> findHumidByCageID(Long cage_id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM humidity h WHERE h.cage_id = :cage_id ORDER BY h.obtained_time ASC limit 1", nativeQuery = true)
    void deleteByCageID(@Param(value = "cage_id") Long cage_id);

}
