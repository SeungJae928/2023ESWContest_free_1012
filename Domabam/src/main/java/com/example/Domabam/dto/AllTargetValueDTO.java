package com.example.Domabam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AllTargetValueDTO {
    private String token;
    private float temp;
    private float humid;
    private Date lamp_start;
    private Date lamp_stop;
    private Date pump_start;
    private Integer pump_hold;
}
