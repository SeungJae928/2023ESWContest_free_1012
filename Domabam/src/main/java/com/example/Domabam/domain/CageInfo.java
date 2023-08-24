package com.example.Domabam.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "cage_info")
public class CageInfo {

    @Id
    @Column(name = "cage_id")
    private Long cage_id;

    @Column(name = "humidity")
    private Integer humid;

    @Column(name = "temperature")
    private Integer temp;

    @Column(name = "lamp")
    private Boolean lamp;

    @Column(name = "heater")
    private Boolean heater;

}
