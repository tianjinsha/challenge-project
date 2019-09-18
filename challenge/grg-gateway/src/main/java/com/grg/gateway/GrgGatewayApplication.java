package com.grg.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author tjshan
 */
@EnableDiscoveryClient
@SpringBootApplication
public class GrgGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GrgGatewayApplication.class, args);
    }

}
