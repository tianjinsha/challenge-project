package com.grg.eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * @author tjshan
 * @date 2019-7-18 15:53:40
 */
@EnableEurekaServer
@SpringBootApplication
public class GrgEurekaApplication {

    public static void main(String[] args) {
        SpringApplication.run(GrgEurekaApplication.class, args);
    }

}
