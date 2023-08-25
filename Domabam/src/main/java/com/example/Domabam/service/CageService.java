package com.example.Domabam.service;

import com.example.Domabam.domain.Cage;
import com.example.Domabam.domain.CageInfo;
import com.example.Domabam.domain.Humidity;
import com.example.Domabam.domain.Temperature;
import com.example.Domabam.dto.*;
import com.example.Domabam.jwt.JwtDecoder;
import com.example.Domabam.repository.JPACageInfoRepository;
import com.example.Domabam.repository.JPACageRepository;
import com.example.Domabam.repository.JPAHumidRepository;
import com.example.Domabam.repository.JPATempRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import static com.example.Domabam.jwt.JwtDecoder.getPayload;

@Service
public class CageService {

    @Autowired
    private JPATempRepository jpaTempRepository;

    @Autowired
    private JPAHumidRepository jpaHumidRepository;

    @Autowired
    private JPACageRepository jpaCageRepository;

    @Autowired
    private JPACageInfoRepository jpaCageInfoRepository;

    private Random random = new Random();


    // 추후 딜레이 조정 후 HW 값으로 변경
    @Scheduled(fixedDelay = 5000)
    public void insertTemp() {
        List<Integer> list = jpaTempRepository.findTempByCageID(Long.parseLong("52"));
        int size = list.size();
        Temperature temp = new Temperature();
        temp.setTemp(random.nextInt(50));
        temp.setCage_id(Long.parseLong("52"));
        temp.setObtained_time(LocalDateTime.now());

        if(size > 9) {
            for(;size > 9;size--) {
                jpaTempRepository.deleteByCageID(Long.parseLong("52"));
            }
        }
        jpaTempRepository.save(temp);
    }


    // 추후 딜레이 조정 후 HW 값으로 변경
    @Scheduled(fixedDelay = 5000)
    public void insertHumid() {
        List<Integer> list = jpaHumidRepository.findHumidByCageID(Long.parseLong("52"));
        int size = list.size();
        Humidity humid = new Humidity();
        humid.setHumid(random.nextInt(50));
        humid.setCage_id(Long.parseLong("52"));
        humid.setObtained_time(LocalDateTime.now());

        if(size > 9) {
            for(;size > 9;size--) {
                jpaHumidRepository.deleteByCageID(Long.parseLong("52"));
            }
        }
        jpaHumidRepository.save(humid);
    }

    //유저 id를 통해 온도 데이터 가져오기
    public List<Integer> getTempData(Long id) {
        Long cage_id = jpaCageRepository.findCageIdByUserId(id);
        return jpaTempRepository.findTempByCageID(cage_id);
    }

    //유저 id를 통해 습도 데이터 가져오기
    public List<Integer> getHumidData(Long id) {
        Long cage_id = jpaCageRepository.findCageIdByUserId(id);
        return jpaHumidRepository.findHumidByCageID(cage_id);
    }

    //사육장 생성 및 사육장 초기 데이터 세팅
    public Cage createCage(CageDataDTO cageDataDTO) {
        Cage cage = Cage.builder()
                .user_id(cageDataDTO.getUser_id())
                .cage_name(cageDataDTO.getCage_name())
                .build();

        jpaCageRepository.save(cage);

        Long cage_id = jpaCageRepository.findCageIdByUserId(cageDataDTO.getUser_id());

        CageInfo cageInfo = new CageInfo().builder()
                .cage_id(cage_id)
                .humidity(0)
                .temperature(0)
                .lamp(false)
                .heater(false)
                .pump(false)
                .build();

        jpaCageInfoRepository.save(cageInfo);

        return cage;
    }

    // cage_id를 통해 사육장 정보 가져오기
    public Cage getCage(Long id) {
        Cage cage = jpaCageRepository.findById(id).orElseThrow();
        System.out.println(cage);
        return cage;
    }

    public CageInfo getCageInfo(TokenDTO tokenDTO) {
        Long user_id = Long.valueOf(JwtDecoder.getUserID(getPayload(tokenDTO.getToken())));
        Long cage_id = jpaCageRepository.findCageIdByUserId(user_id);
        return jpaCageInfoRepository.findById_(cage_id);
    }

    // 사육장에 사육 환경값 세팅
    // 온도
    public CageInfo setTargetTemp(TargetValueDTO targetValueDTO) {
        Long user_id = Long.valueOf(JwtDecoder.getUserID(getPayload(targetValueDTO.getToken())));
        Long cage_id = jpaCageRepository.findCageIdByUserId(user_id);
        jpaCageInfoRepository.updateTemp(cage_id, targetValueDTO.getTarget_value());
        return jpaCageInfoRepository.findById_(cage_id);
    }

    // 사육장에 사육 환경값 세팅
    // 습도
    public CageInfo setTargetHumid(TargetValueDTO targetValueDTO) {
        Long user_id = Long.valueOf(JwtDecoder.getUserID(getPayload(targetValueDTO.getToken())));
        Long cage_id = jpaCageRepository.findCageIdByUserId(user_id);
        jpaCageInfoRepository.updateHumid(cage_id, targetValueDTO.getTarget_value());
        return jpaCageInfoRepository.findById_(cage_id);
    }

    // 사육장에 사육 환경값 세팅
    // 조명
    public CageInfo setLampState(OnOffDTO onOffDTO) {
        Long user_id = Long.valueOf(JwtDecoder.getUserID(getPayload(onOffDTO.getToken())));
        Long cage_id = jpaCageRepository.findCageIdByUserId(user_id);
        System.out.println(cage_id);
        if(onOffDTO.isValue()){
            jpaCageInfoRepository.updateLamp(cage_id, false);
        } else {
            jpaCageInfoRepository.updateLamp(cage_id, true);
        }
        return jpaCageInfoRepository.findById_(cage_id);
    }

    // 사육장에 사육 환경값 세팅
    // 히터
    public CageInfo setHeaterState(OnOffDTO onOffDTO) {
        Long user_id = Long.valueOf(JwtDecoder.getUserID(getPayload(onOffDTO.getToken())));
        Long cage_id = jpaCageRepository.findCageIdByUserId(user_id);
        if(onOffDTO.isValue()){
            jpaCageInfoRepository.updateHeater(cage_id, false);
        } else {
            jpaCageInfoRepository.updateHeater(cage_id, true);
        }
        return jpaCageInfoRepository.findById_(cage_id);
    }

    // 사육장에 사육 환경값 세팅
    // 펌프
    public CageInfo setPumpState(OnOffDTO onOffDTO) {
        Long user_id = Long.valueOf(JwtDecoder.getUserID(getPayload(onOffDTO.getToken())));
        Long cage_id = jpaCageRepository.findCageIdByUserId(user_id);
        if(onOffDTO.isValue()){
            jpaCageInfoRepository.updatePump(cage_id, false);
        } else {
            jpaCageInfoRepository.updatePump(cage_id, true);
        }
        return jpaCageInfoRepository.findById_(cage_id);
    }

//    public CageInfo setCageInfo(CageInfoDTO cageInfo) {
//        CageInfo data = CageInfo.builder()
//                .lamp(cageInfo.isLamp())
//                .heater(cageInfo.isHeater())
//                .temp(cageInfo.getTemp())
//                .cage_id(cageInfo.getCage_id())
//                .humid(cageInfo.getHumid())
//                .build();
//
//        jpaCageInfoRepository.save(data);
//
//        return data;
//    }
}
