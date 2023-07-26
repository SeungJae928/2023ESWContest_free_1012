package com.example.Domabam.controller;

import com.example.Domabam.domain.Humidity;
import com.example.Domabam.domain.Temperature;
import com.example.Domabam.repository.JPAHumidRepository;
import com.example.Domabam.repository.JPATempRepository;
import com.example.Domabam.service.CageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "manage Cage Data", description = "사육장 데이터 관리")
@RestController
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class CageController {

    @Autowired
    private CageService cageService;

    @Autowired
    private JPATempRepository jpaTempRepository;

    @Autowired
    private JPAHumidRepository jpaHumidRepository;

    @Operation(summary = "insert Temp Data", description = "온도 데이터 입력")
    @ApiResponse(responseCode = "200", description = "성공")
    @PutMapping("/api/cage/insertTemp")
    public void insertTemp(@RequestParam Integer temp) {
        Temperature temperature = new Temperature();
        temperature.setTemp(temp);
        temperature.setId(Long.parseLong("100"));
        temperature.setUserID(Long.parseLong("2"));
        temperature.setObtained_time(LocalDateTime.now());
        jpaTempRepository.save(temperature);
    }

    @Operation(summary = "delete Oldest Temp Data", description = "오래된 온도 데이터 삭제")
    @ApiResponse(responseCode = "200", description = "성공")
    @GetMapping("/api/cage/deleteOldestTemp")
    public void deleteTemp() {
        jpaTempRepository.deleteByUserid(Long.parseLong("2"));
    }

    @Operation(summary = "get Temp Data", description = "userId를 통해 온도값 얻기")
    @ApiResponse(responseCode = "200", description = "성공")
    @GetMapping("/api/cage/getTemp")
    public List<Temperature> getTemp() {
        return cageService.getTempData(Long.parseLong("2"));
    }

    @Operation(summary = "insert Humid Data", description = "습도 데이터 입력")
    @ApiResponse(responseCode = "200", description = "성공")
    @PutMapping("/api/cage/insertHumid")
    public void insertHumid(@RequestParam Integer humid) {
        Humidity humidity = new Humidity();
        humidity.setHumid(humid);
        humidity.setId(Long.parseLong("100")); .
        humidity.setUserID(Long.parseLong("2"));
        humidity.setObtained_time(LocalDateTime.now());
        jpaHumidRepository.save(humidity);
    }

    @Operation(summary = "delete Oldest Humid Data", description = "오래된 습도 데이터 삭제")
    @ApiResponse(responseCode = "200", description = "성공")
    @GetMapping("/api/cage/deleteOldestHumid")
    public void deleteHumid() {
        jpaHumidRepository.deleteByUserid(Long.parseLong("2"));
    }

    @Operation(summary = "delete Oldest Humid Data", description = "userId를 통해 습도값 얻기")
    @ApiResponse(responseCode = "200", description = "성공")
    @GetMapping("/api/cage/getHumid")
    public List<Humidity> getHumid() {
        return cageService.getHumidData(Long.parseLong("2"));
    }

}
