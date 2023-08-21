package com.example.Domabam.client;

import com.example.Domabam.domain.User;

public interface ClientProxy {
    User getUserData(String accessToken);
}
