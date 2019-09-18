package com.grg.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author tjshan
 * @date 2019/8/5 8:20
 */
@Slf4j
@RestController
public class IndexController {

    @GetMapping("/ping")

    public String ping(){
        log.info("ping 1");
        return "ping success ! 1";
    }
}
