package com.example.Domabam.repository;

import com.example.Domabam.domain.CageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface JPACageDataRepository extends JpaRepository<CageData, Long> {
    @Transactional
    @Query(value = "SELECT * FROM cage_data d WHERE d.cage_id = :cage_id ORDER BY d.obtained_time", nativeQuery = true)
    List<CageData> findDataByCageID(@Param(value = "cage_id") String cage_id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM cage_data d WHERE d.cage_id = :cage_id ORDER BY d.obtained_time ASC limit 1", nativeQuery = true)
    void deleteByCageID(String cage_id);

    @Transactional
    @Query(value = "SELECT d.temperature FROM cage_data d WHERE d.cage_id = :serial ORDER BY d.obtained_time", nativeQuery = true)
    List<Integer> findTempBySerial(String serial);

    @Transactional
    @Query(value = "SELECT d.humidity FROM cage_data d WHERE d.cage_id = :serial ORDER BY d.obtained_time", nativeQuery = true)
    List<Integer> findHumidBySerial(String serial);
}
