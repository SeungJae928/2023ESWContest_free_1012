package com.example.Domabam.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
public class CageTempHumidDTO {
    private String token;
    private String serial;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date time;
    private float temp;
    private float humid;
}
