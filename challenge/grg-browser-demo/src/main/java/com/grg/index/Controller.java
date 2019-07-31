package com.grg.index;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author tjshan
 * @date 2019/7/31 11:37
 */
@RestController
public class Controller {

    @GetMapping("/ping")
    public String ping(){
        return "ping success !";
    }
}
