package com.example.Domabam.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CageData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "cage_id")
    private String cage_id;

    @Column(name = "temperature")
    private float temp;

    @Column(name = "humidity")
    private float humid;

    @Column(name = "obtained_time")
    private Date obtained_time;
}
