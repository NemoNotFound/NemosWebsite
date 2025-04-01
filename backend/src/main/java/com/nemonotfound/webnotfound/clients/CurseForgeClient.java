package com.nemonotfound.webnotfound.clients;

import com.nemonotfound.webnotfound.models.CurseForgeProject;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.service.annotation.GetExchange;

public interface CurseForgeClient {

    @GetExchange("/v1/mods/{modId}")
    CurseForgeProject getMod(@PathVariable(value = "modId") int modId, @RequestHeader("x-api-key") String apiKey);
}
