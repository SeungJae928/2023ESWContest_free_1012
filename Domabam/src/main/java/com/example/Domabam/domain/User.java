package com.example.Domabam.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "user")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Column(name = "provider")
    private String provider;

    @Column(name = "provider_id")
    private String provider_id;

    @Column(name = "create_date")
    private LocalDateTime create_date;

    @Builder
    public User(String name, String password, String email, Role role, String provider, String provider_id, LocalDateTime createDate){
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
        this.provider = provider;
        this.provider_id = provider_id;
        this.create_date =createDate;
    }
}
