package com.nemonotfound.webnotfound.controllers;

import com.nemonotfound.webnotfound.exceptions.ProjectNotFoundException;
import com.nemonotfound.webnotfound.services.ModService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
class ModControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    ModService modService;

    private static final String MOD_ID = "modId";

    @Test
    void getModrinthDownloads_returnsDownloads_isOk() throws Exception {
        when(modService.getModrinthDownloads(MOD_ID)).thenReturn("23.3k");

        mvc.perform(get(String.format("/mods/%s/downloads/modrinth", MOD_ID)))
                .andExpect(status().isOk());
    }

    @Test
    void getModrinthDownloads_throwsProjectNotFoundException_isNotFound() throws Exception {
        when(modService.getModrinthDownloads(MOD_ID)).thenThrow(ProjectNotFoundException.class);

        mvc.perform(get(String.format("/mods/%s/downloads/modrinth", MOD_ID)))
                .andExpect(status().isNotFound());
    }

    @Test
    void getModrinthDownloads_throwsException_isInternalServerError() throws Exception {
        when(modService.getModrinthDownloads(MOD_ID)).thenThrow(RuntimeException.class);

        mvc.perform(get(String.format("/mods/%s/downloads/modrinth", MOD_ID)))
                .andExpect(status().isInternalServerError());
    }
}
