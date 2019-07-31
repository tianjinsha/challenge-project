package com.grg.config;

import com.grg.filter.PreRequestLogFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * @author tjshan
 * @date 2019/7/31 15:49
 */
@Configuration
public class GatewayConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PreRequestLogFilter preRequestLogFilter() {
        return new PreRequestLogFilter();
    }

}
