package com.nemonotfound.webnotfound.clients;

import com.nemonotfound.webnotfound.models.Project;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;

public interface ModrinthClient {

    @GetExchange("/v2/project/{idOrSlug}")
    Project getProject(@PathVariable(value = "idOrSlug") String idOrSlug);
}
