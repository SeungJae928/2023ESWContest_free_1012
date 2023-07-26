package com.example.Domabam.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Humidity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "userID")
    private Long userID;

    @Column(name = "cage_name")
    private String cage_name;

    @Column(name = "humidity")
    private Integer humid;

    @Column(name = "obtained_time")
    private LocalDateTime obtained_time;

}
