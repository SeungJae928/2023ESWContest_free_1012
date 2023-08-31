package com.example.Domabam.service;

import com.example.Domabam.domain.*;
import com.example.Domabam.dto.*;
import com.example.Domabam.jwt.JwtDecoder;
import com.example.Domabam.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class CageService {

    @Autowired
    private JPACageRepository jpaCageRepository;

    @Autowired
    private JPACageInfoRepository jpaCageInfoRepository;

    @Autowired
    private JPACageDataRepository jpaCageDataRepository;

    private Random random = new Random();


    // 추후 딜레이 조정 후 HW 값으로 변경
//    @Scheduled(fixedDelay = 5000)
//    public void insertTemp() {
//        List<Integer> list = jpaTempRepository.findTempByCageID(Long.parseLong("52"));
//        int size = list.size();
//        Temperature temp = new Temperature();
//        temp.setTemp(random.nextInt(50));
//        temp.setCage_id(Long.parseLong("52"));
//        temp.setObtained_time(LocalDateTime.now());
//
//        if(size > 9) {
//            for(;size > 9;size--) {
//                jpaTempRepository.deleteByCageID(Long.parseLong("52"));
//            }
//        }
//        jpaTempRepository.save(temp);
//    }


    // 추후 딜레이 조정 후 HW 값으로 변경
//    @Scheduled(fixedDelay = 5000)
//    public void insertHumid() {
//        List<Integer> list = jpaHumidRepository.findHumidByCageID(Long.parseLong("52"));
//        int size = list.size();
//        Humidity humid = new Humidity();
//        humid.setHumid(random.nextInt(50));
//        humid.setCage_id(Long.parseLong("52"));
//        humid.setObtained_time(LocalDateTime.now());
//
//        if(size > 9) {
//            for(;size > 9;size--) {
//                jpaHumidRepository.deleteByCageID("52");
//            }
//        }
//        jpaHumidRepository.save(humid);
//    }

    //유저 id를 통해 온도 데이터 가져오기
    public List<Integer> getTempData(TokenDTO tokenDTO) {
        String serial = jpaCageRepository.findSerialByUserId(JwtDecoder.getUserID(tokenDTO.getToken()));
        return jpaCageDataRepository.findTempBySerial(serial);
    }

    //유저 id를 통해 습도 데이터 가져오기
    public List<Integer> getHumidData(TokenDTO tokenDTO) {
        String serial = jpaCageRepository.findSerialByUserId(JwtDecoder.getUserID(tokenDTO.getToken()));
        return jpaCageDataRepository.findHumidBySerial(serial);
    }

    //사육장 생성 및 사육장 초기 데이터 세팅
    public Cage createCage(CageDataDTO cageDataDTO) {
        Cage cage = Cage.builder()
                .user_id(JwtDecoder.getUserID(cageDataDTO.getToken()))
                .cage_name(cageDataDTO.getCage_name())
                .serial_no(cageDataDTO.getSerial())
                .build();

        jpaCageRepository.save(cage);

        String serial = jpaCageRepository.findSerialByUserId(JwtDecoder.getUserID(cageDataDTO.getToken()));

        if(jpaCageInfoRepository.findById(serial).isEmpty()){
            CageInfo cageInfo = new CageInfo().builder()
                    .cage_id(serial)
                    .humidity(0)
                    .temperature(0)
                    .pump_start(null)
                    .lamp_stop(null)
                    .lamp_stop(null)
                    .pump_hold(null)
                    .lamp_state(false)
                    .build();

            jpaCageInfoRepository.save(cageInfo);
        }

        return cage;
    }

    // cage_id를 통해 사육장 정보 가져오기
    public Cage getCage(TokenDTO tokenDTO) {
        Cage cage = jpaCageRepository.findById(JwtDecoder.getUserID(tokenDTO.getToken())).orElseThrow();
        return cage;
    }

    public CageInfo getCageInfo(TokenDTO tokenDTO) {
        Long user_id = Long.valueOf(JwtDecoder.getUserID(tokenDTO.getToken()));
        String serial = jpaCageRepository.findSerialByUserId(user_id);
        return jpaCageInfoRepository.findById_(serial);
    }

    // 사육장에 사육 환경값 세팅
    // 온도
    public CageInfo setTargetTemp(TargetValueDTO targetValueDTO) {
        Long user_id = Long.valueOf(JwtDecoder.getUserID(targetValueDTO.getToken()));
        String serial = jpaCageRepository.findSerialByUserId(user_id);
        jpaCageInfoRepository.updateTemp(serial, targetValueDTO.getTarget_value());
        return jpaCageInfoRepository.findById_(serial);
    }

    // 사육장에 사육 환경값 세팅
    // 습도
    public CageInfo setTargetHumid(TargetValueDTO targetValueDTO) {
        Long user_id = Long.valueOf(JwtDecoder.getUserID(targetValueDTO.getToken()));
        String serial = jpaCageRepository.findSerialByUserId(user_id);
        jpaCageInfoRepository.updateHumid(serial, targetValueDTO.getTarget_value());
        return jpaCageInfoRepository.findById_(serial);
    }

    // 사육장에 사육 환경값 세팅
    // 조명
    public CageInfo setLampState(OnOffDTO onOffDTO) {
        Long user_id = JwtDecoder.getUserID(onOffDTO.getToken());
        String serial = jpaCageRepository.findSerialByUserId(user_id);
        jpaCageInfoRepository.updateLamp(serial, onOffDTO.isState());
        return jpaCageInfoRepository.findById_(serial);
    }

    public CageInfo setCageInfo(AllTargetValueDTO allTargetValueDTO) {

        jpaCageInfoRepository.updateTargetValue(jpaCageRepository.findSerialByUserId(JwtDecoder.getUserID(allTargetValueDTO.getToken())),
                allTargetValueDTO.getTemp(),
                allTargetValueDTO.getHumid(),
                getDate(allTargetValueDTO.getLamp_start()),
                getDate(allTargetValueDTO.getLamp_stop()),
                getDate(allTargetValueDTO.getPump_start()),
                allTargetValueDTO.getPump_hold());

        return jpaCageInfoRepository.findById_(jpaCageRepository.findSerialByUserId(JwtDecoder.getUserID(allTargetValueDTO.getToken())));
    }

    public CageInfo setCurrentData(CurrentDataDTO currentDataDTO) {
        Long user_id = JwtDecoder.getUserID(currentDataDTO.getToken());
        String serial = jpaCageRepository.findSerialByUserId(user_id);

        jpaCageInfoRepository.updateCurrentData(serial, currentDataDTO.getCurrent_temp(), currentDataDTO.getCurrent_humid(), currentDataDTO.isLamp_state());

        return jpaCageInfoRepository.findById_(serial);
    }

    public CageInfo getCurrentData(TokenDTO tokenDTO) {
        String serial = jpaCageRepository.findSerialByUserId(JwtDecoder.getUserID(tokenDTO.getToken()));
        return jpaCageInfoRepository.findCurrentDataBySerial(serial);
    }

    public CageData putCageData(CageTempHumidDTO cageTempHumidDTO){
        CageData data = CageData.builder()
                .temp(cageTempHumidDTO.getTemp())
                .humid(cageTempHumidDTO.getHumid())
                .obtained_time(getDate(cageTempHumidDTO.getTime()))
                .cage_id(cageTempHumidDTO.getSerial())
                .build();

        jpaCageDataRepository.save(data);

        List<CageData> list = jpaCageDataRepository.findDataByCageID(cageTempHumidDTO.getSerial());
        int size = list.size();

        if(size > 24){
            for(;size > 24;size--) {
                jpaCageDataRepository.deleteByCageID(cageTempHumidDTO.getSerial());
            }
        }

        return data;
    }

    public List<CageData> getDataList(TokenDTO tokenDTO) {
        String cage_id = jpaCageRepository.findSerialByUserId(JwtDecoder.getUserID(tokenDTO.getToken()));
        List<CageData> list = jpaCageDataRepository.findDataByCageID(cage_id);

        return list;
    }

    public Date getDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.HOUR, -9);
        return new Date(calendar.getTimeInMillis());
    }
}
