package com.example.Domabam.repository;

import com.example.Domabam.domain.CageInfo;
import com.example.Domabam.dto.CurrentDataDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;

public interface JPACageInfoRepository extends JpaRepository<CageInfo, String> {
    @Transactional
    @Query(value = "SELECT * FROM cage_info c WHERE c.cage_id = :serial", nativeQuery = true)
    CageInfo findById_(String serial);

    @Transactional
    @Modifying
    @Query(value = "UPDATE cage_info SET temperature = :temp WHERE cage_id = :serial", nativeQuery = true)
    void updateTemp(String serial, Integer temp);

    @Transactional
    @Modifying
    @Query(value = "UPDATE cage_info SET humidity = :humid WHERE cage_id = :serial", nativeQuery = true)
    void updateHumid(String serial, Integer humid);

    @Transactional
    @Modifying
    @Query(value = "UPDATE cage_info SET lamp_state = :state WHERE cage_id = :serial", nativeQuery = true)
    void updateLamp(String serial, boolean state);

    @Transactional
    @Modifying
    @Query(value = "UPDATE cage_info SET current_humid = :humid, current_temp = :temp, lamp_state = :lamp WHERE cage_id = :serial", nativeQuery = true)
    void updateCurrentData(@Param("serial") String serial,@Param("temp") float temp,@Param("humid") float humid,@Param("lamp") boolean lamp);

    @Transactional
    @Query(value = "SELECT * FROM cage_info c WHERE c.cage_id = :serial", nativeQuery = true)
    CageInfo findCurrentDataBySerial(String serial);

    @Transactional
    @Modifying
    @Query(value = "UPDATE cage_info SET temperature = :temp, humidity = :humid, lamp_start = :lstart, lamp_stop = :lstop, pump_start = :pstart, pump_hold = :phold WHERE cage_id = :serial", nativeQuery = true)
    void updateTargetValue(@Param("serial") String serial, @Param("temp") float temp, @Param("humid") float humid, @Param("lstart") Date lstart, @Param("lstop") Date lstop, @Param("pstart") Date pstart, @Param("phold") Integer phold);
}
