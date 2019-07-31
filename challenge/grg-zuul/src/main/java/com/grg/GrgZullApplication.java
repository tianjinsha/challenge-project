package com.grg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

/**
 * @author tjshan
 */
@EnableZuulProxy
@EnableDiscoveryClient
@SpringBootApplication
public class GrgZullApplication {

    public static void main(String[] args) {
        SpringApplication.run(GrgZullApplication.class, args);
    }

}
