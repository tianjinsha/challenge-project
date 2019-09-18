package com.grg.security.app.exception;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

/**
 * @author tjshan
 * @since 2019/7/25 16:25
 */
public class AppOauthExceptionSerializer extends StdSerializer<AppOauthException> {

    protected AppOauthExceptionSerializer() {
        super(AppOauthException.class);
    }

    @Override
    public void serialize(AppOauthException value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        jsonGenerator.writeStartObject();

        jsonGenerator.writeStringField("code", String.valueOf(value.getHttpErrorCode()));
        jsonGenerator.writeStringField("msg", value.getMessage());
        jsonGenerator.writeStringField("path", request.getServletPath());
        jsonGenerator.writeStringField("timestamp", String.valueOf(System.currentTimeMillis()));
        if (value.getAdditionalInformation() != null) {
            for (Map.Entry<String, String> entry : value.getAdditionalInformation().entrySet()) {
                String key = entry.getKey();
                String add = entry.getValue();
                jsonGenerator.writeStringField(key, add);
            }
        }
        jsonGenerator.writeEndObject();
    }

}
