package com.nemonotfound.webnotfound.services;

import com.nemonotfound.webnotfound.clients.ModrinthClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class ModService {

    private final ModrinthClient modrinthClient;

    public String getModrinthDownloads(String idOrSlug) {
        return formatNumber(modrinthClient.getProject(idOrSlug).getDownloads());
    }

    private String formatNumber(int downloadCount) {
        var numberFormat = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);
        numberFormat.setMaximumFractionDigits(1);

        return numberFormat.format(downloadCount);
    }
}
