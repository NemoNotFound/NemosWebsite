package com.nemonotfound.webnotfound.controllers;

import com.nemonotfound.webnotfound.services.ModService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/mods")
@RequiredArgsConstructor
public class ModController {

    private final ModService modService;

    @GetMapping(value = "/{idOrSlug}/downloads/modrinth")
    public String getModrinthDownloads(@PathVariable(value = "idOrSlug") String idOrSlug) {
        return modService.getModrinthDownloads(idOrSlug);
    }

    @GetMapping(value = "/{slug}/downloads/curseforge")
    public String getCurseForgeDownloads(@PathVariable(value = "slug") String slug) {
        return modService.getCurseForgeDownloads(slug);
    }
}
