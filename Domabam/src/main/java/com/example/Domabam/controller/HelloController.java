package com.example.Domabam.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "hello", description = "Hello Swagger")
@RestController
public class HelloController {

    @Operation(summary = "get Hello", description = "hello 출력")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/api/hello")
    public String hello(){
        return "HELLO HELLO!";
    }
}
