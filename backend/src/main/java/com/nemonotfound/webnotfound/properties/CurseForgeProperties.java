package com.nemonotfound.webnotfound.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Map;

@Getter
@Setter
@ConfigurationProperties(prefix = "curse-forge")
public class CurseForgeProperties {

    String url;
    String apiKey;
    Map<String, Integer> slugIdMap;

}


