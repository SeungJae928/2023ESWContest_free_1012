package com.example.Domabam.dto;

import lombok.Getter;

@Getter
public class CurrentDataDTO {
    private String token;
    private float current_temp;
    private float current_humid;
    private boolean lamp_state;
}
