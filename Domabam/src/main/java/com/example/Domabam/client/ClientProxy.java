package com.example.Domabam.client;

import com.example.Domabam.domain.User;

import java.io.IOException;

public interface ClientProxy {
    User getUserData(String accessToken) throws IOException;
}
