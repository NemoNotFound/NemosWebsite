package com.nemonotfound.webnotfound.services;

import com.nemonotfound.webnotfound.clients.CurseForgeClient;
import com.nemonotfound.webnotfound.clients.ModrinthClient;
import com.nemonotfound.webnotfound.exceptions.ProjectNotFoundException;
import com.nemonotfound.webnotfound.exceptions.SlugMappingNotFoundException;
import com.nemonotfound.webnotfound.models.CurseForgeProject;
import com.nemonotfound.webnotfound.models.ModrinthProject;
import com.nemonotfound.webnotfound.properties.CurseForgeProperties;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Map;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ModServiceTest {

    @Mock
    private ModrinthClient modrinthClient;

    @Mock
    private CurseForgeClient curseForgeClient;

    @Mock
    private CurseForgeProperties curseForgeProperties;

    @InjectMocks
    private ModService modService;

    private static final String MOD_ID = "modId";

    @Test
    void getModrinthDownloads_projectNotFound_throwsProjectNotFoundException() {
        when(modrinthClient.getProject(MOD_ID)).thenReturn(null);

        assertThrows(ProjectNotFoundException.class, () -> modService.getModrinthDownloads(MOD_ID));
    }

    @ParameterizedTest
    @MethodSource("provideDownloadsWithConvertedValue")
    void getModrinthDownloads_projectExists_returnConvertedDownloads(int downloads, String expectedConvertedDownloads) {
        when(modrinthClient.getProject(MOD_ID)).thenReturn(new ModrinthProject(downloads));

        var convertedDownloads= modService.getModrinthDownloads(MOD_ID);

        assertThat(convertedDownloads).isEqualTo(expectedConvertedDownloads);
    }

    @Test
    void getCurseForgeDownloads_projectNotFound_throwsProjectNotFoundException() {
        when(curseForgeClient.getMod(0, "apiKey")).thenReturn(null);
        when(curseForgeProperties.getApiKey()).thenReturn("apiKey");
        when(curseForgeProperties.getSlugIdMap()).thenReturn(Map.of(MOD_ID, 0));

        assertThrows(ProjectNotFoundException.class, () -> modService.getCurseForgeDownloads(MOD_ID));
    }

    @Test
    void getCurseForgeDownloads_slugMappingNotFound_throwsSlugMappingNotFoundException() {
        when(curseForgeProperties.getApiKey()).thenReturn("apiKey");

        assertThrows(SlugMappingNotFoundException.class, () -> modService.getCurseForgeDownloads(MOD_ID));
    }

    @ParameterizedTest
    @MethodSource("provideDownloadsWithConvertedValue")
    void getCurseForgeDownloads_projectExists_returnConvertedDownloads(int downloads, String expectedConvertedDownloads) {
        when(curseForgeProperties.getApiKey()).thenReturn("apiKey");
        when(curseForgeClient.getMod(0, "apiKey")).thenReturn(new CurseForgeProject(new CurseForgeProject.Data(downloads)));
        when(curseForgeProperties.getSlugIdMap()).thenReturn(Map.of(MOD_ID, 0));

        var convertedDownloads= modService.getCurseForgeDownloads(MOD_ID);

        assertThat(convertedDownloads).isEqualTo(expectedConvertedDownloads);
    }

    private static Stream<Arguments> provideDownloadsWithConvertedValue() {
        return Stream.of(
                Arguments.of(2300, "2.3K"),
                Arguments.of(23300, "23.3K"),
                Arguments.of(233000, "233K"),
                Arguments.of(2330000, "2.3M"),
                Arguments.of(23300000, "23.3M"),
                Arguments.of(233000000, "233M"),
                Arguments.of(233, "233")
        );
    }
}
