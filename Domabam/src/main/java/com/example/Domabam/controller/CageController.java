package com.example.Domabam.controller;

import com.example.Domabam.domain.Cage;
import com.example.Domabam.domain.CageInfo;
import com.example.Domabam.domain.Humidity;
import com.example.Domabam.domain.Temperature;
import com.example.Domabam.dto.*;
import com.example.Domabam.repository.JPAHumidRepository;
import com.example.Domabam.repository.JPATempRepository;
import com.example.Domabam.service.CageService;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "manage Cage Data", description = "사육장 데이터 관리")
@RestController
@RequestMapping(value = "/api/cage")
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
    @PutMapping("/insertTemp")
    public void insertTemp(@RequestParam Integer temp) {
        Temperature temperature = new Temperature();
        temperature.setTemp(temp);
        temperature.setId(Long.parseLong("100"));
        temperature.setCage_id(Long.parseLong("2"));
        temperature.setObtained_time(LocalDateTime.now());
        jpaTempRepository.save(temperature);
    }

//    @Operation(summary = "delete Oldest Temp Data", description = "오래된 온도 데이터 삭제")
//    @ApiResponse(responseCode = "200", description = "성공")
//    @GetMapping("/deleteOldestTemp")
//    public void deleteTemp() {
//        jpaTempRepository.deleteByCageID(Long.parseLong("2"));
//    }

    @Operation(summary = "get Temp Data", description = "userId를 통해 온도값 얻기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/getTemp")
    @JsonProperty("userDataDTO")
    @ResponseBody
    public List<Integer> getTemp(@RequestBody UserDataDTO userDataDTO) {
        return cageService.getTempData(userDataDTO.getId());
    }

    @Operation(summary = "insert Humid Data", description = "습도 데이터 입력")
    @ApiResponse(responseCode = "200", description = "성공")
    @PutMapping("/insertHumid")
    public void insertHumid(@RequestParam Integer humid) {
        Humidity humidity = new Humidity();
        humidity.setHumid(humid);
        humidity.setId(Long.parseLong("100"));
        humidity.setCage_id(Long.parseLong("2"));
        humidity.setObtained_time(LocalDateTime.now());
        jpaHumidRepository.save(humidity);
    }

//    @Operation(summary = "delete Oldest Humid Data", description = "오래된 습도 데이터 삭제")
//    @ApiResponse(responseCode = "200", description = "성공")
//    @GetMapping("/deleteOldestHumid")
//    public void deleteHumid() {
//        jpaHumidRepository.deleteByCageID(Long.parseLong("2"));
//    }

    @Operation(summary = "get Humid Data", description = "userId를 통해 습도값 얻기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/getHumid")
    @ResponseBody
    @JsonProperty("userDataDTO")
    public List<Integer> getHumid(@RequestBody UserDataDTO userDataDTO) {
        return cageService.getHumidData(userDataDTO.getId());
    }

    @Operation(summary = "create New Cage", description = "새 사육장 등록")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping(value = "/createCage")
    public ResponseEntity<Cage> createCage(@RequestBody CageDataDTO cageDataDTO) {
        return ApiResponseDTO.success(cageService.createCage(cageDataDTO));
    }

    @Operation(summary = "get Cage Data", description = "사육장 정보 가져오기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/getCageData")
    public ResponseEntity<Cage> getCageData(@RequestBody UserDataDTO userDataDTO) {
        return ApiResponseDTO.success(cageService.getCage(userDataDTO.getId()));
    }

    @Operation(summary = "get CageInfo", description = "사육장 세팅 정보 가져오기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/getCageInfo")
    public ResponseEntity<CageInfo> getCageData(@RequestBody TokenDTO tokenDTO) {
        return ApiResponseDTO.success(cageService.getCageInfo(tokenDTO));
    }

    // 추후 사용
//    @Operation(summary = "set Cage Data", description = "사육장 정보 저장하기")
//    @ApiResponse(responseCode = "200", description = "성공")
//    @PostMapping("/setCageData")
//    public ResponseEntity<CageInfo> setCageData(@RequestBody CageInfoDTO cageInfoDTO) {
//        return ApiResponseDTO.success(cageService.setCageInfo(cageInfoDTO));
//    }

    @Operation(summary = "set Cage Temp Data", description = "사육장 온도 정보 설정하기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/setTargetTemp")
    public ResponseEntity<CageInfo> setCageTemp(@RequestBody TargetValueDTO targetValueDTO) {
        return ApiResponseDTO.success(cageService.setTargetTemp(targetValueDTO));
    }

    @Operation(summary = "set Cage Humid Data", description = "사육장 습도 정보 설정하기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/setTargetHumid")
    public ResponseEntity<CageInfo> setCageHumid(@RequestBody TargetValueDTO targetValueDTO) {
        return ApiResponseDTO.success(cageService.setTargetHumid(targetValueDTO));
    }

    @Operation(summary = "set Cage Heater State", description = "사육장 히터 상태 설정하기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/setHeaterState")
    public ResponseEntity<CageInfo> setHeaterState(@RequestBody OnOffDTO onOffDTO) {
        return ApiResponseDTO.success(cageService.setHeaterState(onOffDTO));
    }

    @Operation(summary = "set Cage Lamp State", description = "사육장 조명 상태 설정하기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/setLampState")
    public ResponseEntity<CageInfo> setLampState(@RequestBody OnOffDTO onOffDTO) {
        return ApiResponseDTO.success(cageService.setLampState(onOffDTO));
    }

    @Operation(summary = "set Cage Pump State", description = "사육장 펌프 상태 설정하기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/setPumpState")
    public ResponseEntity<CageInfo> setPumpState(@RequestBody OnOffDTO onOffDTO) {
        return ApiResponseDTO.success(cageService.setPumpState(onOffDTO));
    }
}
