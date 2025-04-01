package com.nemonotfound.webnotfound.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWireMock(port = 0)
public class ModIntegrationTest {

    private static final String BASE_URL = "http://localhost:%s/mods/%s/downloads/";
    private static final String MODRINTH_URL = BASE_URL + "modrinth";
    private static final String CURSEFORGE_URL = BASE_URL + "curseforge";

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int port;

    private static final String MOD_ID = "nemos-woodcutter";

    @Test
    void getModrinthDownloads() {
        stubFor(get(urlEqualTo("/v2/project/" + MOD_ID))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("{\"downloads\": 23300, \"title\": \"Mod Title\"}")
                )
        );

        var downloads = restTemplate.getForObject(String.format(MODRINTH_URL, port, MOD_ID), String.class);

        assertThat(downloads).isEqualTo("23.3K");
    }

    @Test
    void getCurseForgeDownloads() {
        stubFor(get(urlEqualTo("/v1/mods/" + 914549))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("{ \"data\": {\"downloadCount\": 23300, \"title\": \"Mod Title\"}}")
                )
        );

        var downloads = restTemplate.getForObject(String.format(CURSEFORGE_URL, port, MOD_ID), String.class);

        assertThat(downloads).isEqualTo("23.3K");
    }
}
