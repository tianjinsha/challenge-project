package com.grg.gateway.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * @author tjshan
 * @date 2019/7/31 13:28
 */
@Slf4j
@Configuration
@CrossOrigin(origins = "*", maxAge = 3600)
public class RouteConfig {

//    @Bean
//    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
//        log.info("----customRouterLocator----: {}",builder.toString());
//        return builder.routes()
//                .route(r->r.path("/browser/**")
//                        .filters(f->f.stripPrefix(1))
//                        .uri("lb://grg-browser-demo"))
//                .build();
//    }
}
