package com.example.Domabam;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = DomabamApplication.class)
public class FindAllBean {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    public void contextLoads() throws Exception {
        if (applicationContext != null) {
            String[] beans = applicationContext.getBeanDefinitionNames();

            for (String bean : beans) {
                System.out.println("bean : " + bean);
            }
        }
    }
}
