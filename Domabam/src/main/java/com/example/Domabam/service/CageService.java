package com.example.Domabam.service;

import com.example.Domabam.domain.Humidity;
import com.example.Domabam.domain.Temperature;
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

    private Random random = new Random();

    @Scheduled(fixedDelay = 5000)
    public void insertTemp() {
        List<Temperature> list = jpaTempRepository.findByUserID(Long.parseLong("2"));
        int size = list.size();
        Temperature temp = new Temperature();
        temp.setTemp(random.nextInt(50));
        temp.setUserID(Long.parseLong("2"));
        temp.setObtained_time(LocalDateTime.now());

        if(size > 9) {
            for(;size > 9;size--) {
                jpaTempRepository.deleteByUserid(Long.parseLong("2"));
            }
        }
        jpaTempRepository.save(temp);
    }

    @Scheduled(fixedDelay = 5000)
    public void insertHumid() {
        List<Humidity> list = jpaHumidRepository.findByUserID(Long.parseLong("2"));
        int size = list.size();
        Humidity humid = new Humidity();
        humid.setHumid(random.nextInt(50));
        humid.setUserID(Long.parseLong("2"));
        humid.setObtained_time(LocalDateTime.now());

        if(size > 9) {
            for(;size > 9;size--) {
                jpaHumidRepository.deleteByUserid(Long.parseLong("2"));
            }
        }
        jpaHumidRepository.save(humid);
    }

    public List<Temperature> getTempData(Long id) {
        return jpaTempRepository.findByUserID(id);
    }

    public List<Humidity> getHumidData(Long id) {
        return jpaHumidRepository.findByUserID(id);
    }

}
