package com.example.Domabam.domain;

import jakarta.persistence.*;
import lombok.*;

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
    private Long cage_id;

    @Column(name = "humidity")
    private Integer humidity;

    @Column(name = "temperature")
    private Integer temperature;

    @Column(name = "lamp")
    private boolean lamp;

    @Column(name = "heater")
    private boolean heater;

    @Column(name = "pump")
    private boolean pump;
}
