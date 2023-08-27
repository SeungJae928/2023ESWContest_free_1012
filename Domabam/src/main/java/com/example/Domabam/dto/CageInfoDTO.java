package com.example.Domabam.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CageInfoDTO {

    private Long cage_id;
    private Integer temp;
    private Integer humid;
    private boolean lamp;
    private boolean heater;

}
