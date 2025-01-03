package com.nemonotfound.webnotfound.services;

import com.nemonotfound.webnotfound.clients.ModrinthClient;
import com.nemonotfound.webnotfound.exceptions.ProjectNotFoundException;
import com.nemonotfound.webnotfound.models.Project;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ModServiceTest {

    @Mock
    private ModrinthClient modrinthClient;

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
        when(modrinthClient.getProject(MOD_ID)).thenReturn(new Project(downloads));

        var convertedDownloads= modService.getModrinthDownloads(MOD_ID);

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
