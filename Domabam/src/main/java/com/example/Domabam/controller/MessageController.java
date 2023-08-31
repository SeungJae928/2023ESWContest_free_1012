package com.example.Domabam.controller;

import com.example.Domabam.domain.Cage;
import com.example.Domabam.dto.AllTargetValueDTO;
import com.example.Domabam.dto.ApiResponseDTO;
import com.example.Domabam.dto.CageDataDTO;
import com.example.Domabam.dto.OnOffDTO;
import com.example.Domabam.jwt.JwtDecoder;
import com.example.Domabam.model.CreateCageMessage;
import com.example.Domabam.model.LampStateMessage;
import com.example.Domabam.model.TargetValueMessage;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@Slf4j
public class MessageController {

    Logger logger = LoggerFactory.getLogger(MessageController.class);

    private final SimpMessagingTemplate messagingTemplate;

    public MessageController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping(value = "/chat/createCage")
    public ResponseEntity<CreateCageMessage> sendMessage(CageDataDTO cageDataDTO){

        CreateCageMessage message = CreateCageMessage.builder()
                .token(cageDataDTO.getToken())
                .name(cageDataDTO.getCage_name())
                .build();

        System.out.println(cageDataDTO.getCage_name());

        logger.info(message.toString());
        messagingTemplate.convertAndSend("/topic/messages/createCage", message);

        return ApiResponseDTO.success(message);
    }

    @MessageMapping(value = "/chat/targetValue")
    public ResponseEntity<TargetValueMessage> sendMessage(AllTargetValueDTO allTargetValueDTO){

        TargetValueMessage message = TargetValueMessage.builder()
                .token(allTargetValueDTO.getToken())
                .temp(allTargetValueDTO.getTemp())
                .humid(allTargetValueDTO.getHumid())
                .pump_start(allTargetValueDTO.getPump_start())
                .lamp_stop(allTargetValueDTO.getLamp_stop())
                .lamp_start(allTargetValueDTO.getLamp_start())
                .pump_hold(allTargetValueDTO.getPump_hold())
                .build();

        logger.info(message.toString());
        messagingTemplate.convertAndSend("/topic/messages/targetValue", message);

        return ApiResponseDTO.success(message);
    }

    @MessageMapping(value = "/chat/changeLampState")
    public ResponseEntity<LampStateMessage> sendMessage(OnOffDTO onOffDTO){

        LampStateMessage message = LampStateMessage.builder()
                .state(onOffDTO.isState())
                .token(onOffDTO.getToken())
                .build();

        logger.info(message.toString());
        messagingTemplate.convertAndSend("/topic/messages/changeLampState", message);

        return ApiResponseDTO.success(message);
    }

}
