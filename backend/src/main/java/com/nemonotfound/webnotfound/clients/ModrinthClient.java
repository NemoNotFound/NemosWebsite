package com.nemonotfound.webnotfound.clients;

import com.nemonotfound.webnotfound.models.ModrinthProject;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;

public interface ModrinthClient {

    @GetExchange("/v2/project/{idOrSlug}")
    ModrinthProject getProject(@PathVariable(value = "idOrSlug") String idOrSlug);
}
