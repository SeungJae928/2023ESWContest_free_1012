package com.example.Domabam.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cage {

    @Id
    @Column(name = "serial")
    private String serial_no;

    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "cage_name")
    private String cage_name;
}
