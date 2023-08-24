package com.example.Domabam.repository;

import com.example.Domabam.domain.CageInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface JPACageInfoRepository extends JpaRepository<CageInfo, Long> {
    @Transactional
    @Query(value = "SELECT * FROM cage_info c WHERE c.cage_id = :cage_id", nativeQuery = true)
    CageInfo findById_(Long cage_id);

    @Transactional
    @Query(value = "UPDATE cage_info SET temperature = :temp WHERE cage_id = :cage_id", nativeQuery = true)
    void updateTemp(Long cage_id, Integer temp);

    @Transactional
    @Query(value = "UPDATE cage_info SET humidity = :humid WHERE cage_id = :cage_id", nativeQuery = true)
    void updateHumid(Long cage_id, Integer humid);

    @Transactional
    @Query(value = "UPDATE cage_info SET lamp = :state WHERE cage_id = :cage_id", nativeQuery = true)
    void updateLamp(Long cage_id, boolean state);

    @Transactional
    @Query(value = "UPDATE cage_info SET heater = :state WHERE cage_id = :cage_id", nativeQuery = true)
    void updateHeater(Long cage_id, boolean state);

    @Transactional
    @Query(value = "UPDATE cage_info SET pump = :state WHERE cage_id = :cage_id", nativeQuery = true)
    void updatePump(Long cage_id, boolean state);
}
