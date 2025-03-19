package com.nemonotfound.webnotfound.configs;

import com.nemonotfound.webnotfound.clients.ModrinthClient;
import com.nemonotfound.webnotfound.properties.ModrinthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
@RequiredArgsConstructor
public class ModrinthClientConfig {

    private final ModrinthProperties clientProperties;

    @Bean
    ModrinthClient modrinthClient() {
        WebClient webClient = WebClient.builder()
                .baseUrl(clientProperties.getUrl())
                .build();
        WebClientAdapter adapter = WebClientAdapter.create(webClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();

        return factory.createClient(ModrinthClient.class);
    }
}
