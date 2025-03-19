package com.nemonotfound.webnotfound.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "modrinth")
public class ModrinthProperties {

    String url;

}


