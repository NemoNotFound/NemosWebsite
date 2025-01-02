package com.nemonotfound.webnotfound.configs;

import com.nemonotfound.webnotfound.clients.ModrinthClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class ModrinthClientConfig {

    @Bean
    ModrinthClient modrinthClient() {
        WebClient webClient = WebClient.builder().baseUrl("https://api.modrinth.com").build();
        WebClientAdapter adapter = WebClientAdapter.create(webClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();

        return factory.createClient(ModrinthClient.class);
    }
}
