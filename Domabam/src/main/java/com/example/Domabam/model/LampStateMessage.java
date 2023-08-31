package com.example.Domabam.model;

import lombok.*;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LampStateMessage {
    private String token;
    private boolean state;
}
