package com.nemonotfound.webnotfound.services;

import com.nemonotfound.webnotfound.clients.ModrinthClient;
import com.nemonotfound.webnotfound.exceptions.ProjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class ModService {

    private final ModrinthClient modrinthClient;

    public String getModrinthDownloads(String idOrSlug) {
        var project = modrinthClient.getProject(idOrSlug);

        if (project == null) {
            throw new ProjectNotFoundException(idOrSlug);
        }

        return formatNumber(project.getDownloads());
    }

    private String formatNumber(int downloadCount) {
        var numberFormat = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);
        numberFormat.setMaximumFractionDigits(1);

        return numberFormat.format(downloadCount);
    }
}
