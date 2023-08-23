package com.example.Domabam.service;

import com.example.Domabam.domain.Cage;
import com.example.Domabam.domain.Humidity;
import com.example.Domabam.domain.Temperature;
import com.example.Domabam.dto.CageDataDTO;
import com.example.Domabam.dto.UserDataDTO;
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

@Service
public class CageService {

    @Autowired
    private JPATempRepository jpaTempRepository;

    @Autowired
    private JPAHumidRepository jpaHumidRepository;

    @Autowired
    private JPACageRepository jpaCageRepository;

    private Random random = new Random();

    @Scheduled(fixedDelay = 5000)
    public void insertTemp() {
        List<Integer> list = jpaTempRepository.findTempByCageID(Long.parseLong("2"));
        int size = list.size();
        Temperature temp = new Temperature();
        temp.setTemp(random.nextInt(50));
        temp.setCage_id(Long.parseLong("2"));
        temp.setObtained_time(LocalDateTime.now());

        if(size > 9) {
            for(;size > 9;size--) {
                jpaTempRepository.deleteByCageID(Long.parseLong("2"));
            }
        }
        jpaTempRepository.save(temp);
    }

    @Scheduled(fixedDelay = 5000)
    public void insertHumid() {
        List<Integer> list = jpaHumidRepository.findHumidByCageID(Long.parseLong("2"));
        int size = list.size();
        Humidity humid = new Humidity();
        humid.setHumid(random.nextInt(50));
        humid.setCage_id(Long.parseLong("2"));
        humid.setObtained_time(LocalDateTime.now());

        if(size > 9) {
            for(;size > 9;size--) {
                jpaHumidRepository.deleteByCageID(Long.parseLong("2"));
            }
        }
        jpaHumidRepository.save(humid);
    }

    public List<Integer> getTempData(Long id) {
        Long cage_id = jpaCageRepository.findCageIdByUserId(id);
        return jpaTempRepository.findTempByCageID(cage_id);
    }

    public List<Integer> getHumidData(Long id) {
        Long cage_id = jpaCageRepository.findCageIdByUserId(id);
        return jpaHumidRepository.findHumidByCageID(cage_id);
    }

    public Cage createCage(CageDataDTO cageDataDTO) {
        Cage cage = Cage.builder()
                .user_id(cageDataDTO.getUser_id())
                .cage_name(cageDataDTO.getCage_name())
                .build();

        jpaCageRepository.save(cage);

        return cage;
    }

    public Cage getCage(Long id) {
        Cage cage = jpaCageRepository.findById(id).orElseThrow();
        System.out.println(cage);
        return cage;
    }
}
