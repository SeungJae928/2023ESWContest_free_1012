package com.example.Domabam.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "cage_info")
public class CageInfo {

    @Id
    @Column(name = "cage_id")
    private String cage_id;

    @Column(name = "humidity")
    private float humidity;

    @Column(name = "temperature")
    private float temperature;

    @Column(name = "lamp_start")
    private Date lamp_start;

    @Column(name = "lamp_stop")
    private Date lamp_stop;

    @Column(name = "pump_start")
    private Date pump_start;

    @Column(name = "pump_hold")
    private Integer pump_hold;

    @Column(name = "current_temp")
    private float current_temp;

    @Column(name = "current_humid")
    private float current_humid;

    @Column(name = "lamp_state")
    private boolean lamp_state;
}
