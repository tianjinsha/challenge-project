package com.grg.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;

/**
 * Zuul日志过滤器
 * filterType：返回过滤器类型，有 pre、route、post、error 等几种取值
 * filterOrder：返回一个 int 值指定过滤器执行顺序，不同过滤器允许返回相同的数字
 * shouldFilter：true 表示过滤器执行、false表示不执行
 * run：过滤器具体逻辑，下面代码打印了请求方法和URL
 * @author tjshan
 * @date 2019/7/31 15:47
 */
public class PreRequestLogFilter extends ZuulFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(PreRequestLogFilter.class);

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() throws ZuulException {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();
        PreRequestLogFilter.LOGGER.info(
                String.format("send %s request to %s",
                        request.getMethod(),
                        request.getRequestURL().toString()));
        return null;
    }
}
