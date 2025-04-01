package com.nemonotfound.webnotfound.services;

import com.nemonotfound.webnotfound.clients.CurseForgeClient;
import com.nemonotfound.webnotfound.clients.ModrinthClient;
import com.nemonotfound.webnotfound.exceptions.ProjectNotFoundException;
import com.nemonotfound.webnotfound.exceptions.SlugMappingNotFoundException;
import com.nemonotfound.webnotfound.properties.CurseForgeProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class ModService {

    private final ModrinthClient modrinthClient;
    private final CurseForgeClient curseForgeClient;
    private final CurseForgeProperties curseForgeProperties;

    public String getModrinthDownloads(String idOrSlug) {
        var project = modrinthClient.getProject(idOrSlug);

        if (project == null) {
            throw new ProjectNotFoundException(idOrSlug);
        }

        return formatNumber(project.getDownloads());
    }

    public String getCurseForgeDownloads(String slug) {
        var apiKey = curseForgeProperties.getApiKey();
        var id = curseForgeProperties.getSlugIdMap().get(slug);

        if (id == null) {
            throw new SlugMappingNotFoundException(slug);
        }

        var project = curseForgeClient.getMod(id, apiKey);

        if (project == null) {
            throw new ProjectNotFoundException(slug);
        }

        return formatNumber(project.getData().getDownloadCount());
    }

    private String formatNumber(int downloadCount) {
        var numberFormat = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);
        numberFormat.setMaximumFractionDigits(1);

        return numberFormat.format(downloadCount);
    }
}
