package com.example.Domabam.model;

import lombok.*;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CreateCageMessage {
    private String token;
    private String name;
}
