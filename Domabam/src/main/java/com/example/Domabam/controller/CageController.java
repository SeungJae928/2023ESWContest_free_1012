package com.example.Domabam.controller;

import com.example.Domabam.domain.*;
import com.example.Domabam.dto.*;
import com.example.Domabam.service.CageService;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "manage Cage Data", description = "사육장 데이터 관리")
@RestController
@RequestMapping(value = "/api/cage")
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class CageController {

    @Autowired
    private CageService cageService;

    @Operation(summary = "get Temp Data", description = "Token을 통해 온도값 얻기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/getTemp")
    @JsonProperty("userDataDTO")
    @ResponseBody
    public List<Integer> getTemp(@RequestBody TokenDTO tokenDTO) {
        return cageService.getTempData(tokenDTO);
    }

    @Operation(summary = "get Humid Data", description = "Token을 통해 습도값 얻기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/getHumid")
    @ResponseBody
    @JsonProperty("userDataDTO")
    public List<Integer> getHumid(@RequestBody TokenDTO tokenDTO) {
        return cageService.getHumidData(tokenDTO);
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
    public ResponseEntity<Cage> getCageData(@RequestBody TokenDTO tokenDTO) {
        return ApiResponseDTO.success(cageService.getCage(tokenDTO));
    }

    @Operation(summary = "get CageInfo", description = "사육장 세팅 정보 가져오기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/getCageInfo")
    public ResponseEntity<CageInfo> getCageInfo(@RequestBody TokenDTO tokenDTO) {
        return ApiResponseDTO.success(cageService.getCageInfo(tokenDTO));
    }

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

    @Operation(summary = "set Cage Lamp State", description = "사육장 조명 상태 설정하기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PutMapping("/setLampState")
    public ResponseEntity<CageInfo> setLampState(@RequestBody OnOffDTO onOffDTO) {
        return ApiResponseDTO.success(cageService.setLampState(onOffDTO));
    }

    @Operation(summary = "set Cage Info", description = "사육장 환경 설정하기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PutMapping("/setCageInfo")
    public ResponseEntity<CageInfo> setCageInfo(@RequestBody AllTargetValueDTO allTargetValueDTO) {
        return ApiResponseDTO.success(cageService.setCageInfo(allTargetValueDTO));
    }

    @Operation(summary = "put current data", description = "최근 환경 값 설정")
    @ApiResponse(responseCode = "200", description = "성공")
    @PutMapping("/setCurrentData")
    public ResponseEntity<CageInfo> setCurrentData(@RequestBody CurrentDataDTO currentDataDTO) {
        return ApiResponseDTO.success(cageService.setCurrentData(currentDataDTO));
    }

    @Operation(summary = "get current data", description = "최근 환경 값 가져오기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/getCurrentData")
    public ResponseEntity<CageInfo> getCurrentData(@RequestBody TokenDTO tokenDTO) {
        return ApiResponseDTO.success(cageService.getCurrentData(tokenDTO));
    }

    @Operation(summary = "get temp,humid data", description = "1시간 단위 온습도 값 가져오기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/putCageData")
    public ResponseEntity<CageData> putCageData(@RequestBody CageTempHumidDTO cageTempHumidDTO) {
        return ApiResponseDTO.success(cageService.putCageData(cageTempHumidDTO));
    }

    @Operation(summary = "get temp,humid data", description = "1시간 단위 온습도 값 가져오기")
    @ApiResponse(responseCode = "200", description = "성공")
    @PostMapping("/getCageDataList")
    public ResponseEntity<List<CageData>> getCageDataList(@RequestBody TokenDTO tokenDTO) {
        return ApiResponseDTO.success(cageService.getDataList(tokenDTO));
    }
}
