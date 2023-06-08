package com.example.Domabam.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Tag(name = "hello", description = "Hello Swagger")
@RestController
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class HelloController {

    @AllArgsConstructor
    @Getter
    class DataSet {
        private int a; // test 온도
        private int b; // test 습도
    }

    List<DataSet> list = new ArrayList<>();

    @Operation(summary = "get Hello", description = "hello 출력")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @GetMapping("/api/hello")
    public String hello(){
        return "HELLO HELLO!";
    }

    @GetMapping("/test")
    @ResponseBody
    public List<DataSet> getData() {
        System.out.println("tt");
        list.add(new DataSet(new Random().nextInt(50), new Random().nextInt(50)));
        return list;
    }
}
