package com.example.Domabam.model;

import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TargetValueMessage {
    private String token;
    private float temp;
    private float humid;
    private Date lamp_start;
    private Date lamp_stop;
    private Date pump_start;
    private Integer pump_hold;
}
