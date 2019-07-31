package com.grg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author tjshan
 */
@EnableDiscoveryClient
@SpringBootApplication
public class GrgBrowserDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(GrgBrowserDemoApplication.class, args);
    }

}
