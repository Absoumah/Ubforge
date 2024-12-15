package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Release;
import com.ubforge.ubforge.service.ReleaseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

class ReleaseControllerTest {

    @Mock
    private ReleaseService releaseService;

    @InjectMocks
    private ReleaseController releaseController;

    private Release release;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'une version pour les tests
        release = new Release();
        release.setId(1);
        release.setName("Test Release");
        release.setStatus("Active");
    }

    @Test
    void testGetAllReleases() {
        // Simuler la récupération de toutes les versions
        List<Release> releases = Arrays.asList(release);
        when(releaseService.getAllReleases()).thenReturn(releases);

        // Appeler la méthode du contrôleur
        List<Release> response = releaseController.getAllReleases();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'il y a une version dans la réponse
        assertEquals(release.getId(), response.get(0).getId()); // Vérifie l'ID de la version
        verify(releaseService, times(1)).getAllReleases(); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetReleaseById() {
        // Simuler la récupération d'une version par ID
        when(releaseService.getReleaseById(1)).thenReturn(release);

        // Appeler la méthode du contrôleur
        Release response = releaseController.getReleaseById(1);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(release.getId(), response.getId()); // Vérifie l'ID de la version
        verify(releaseService, times(1)).getReleaseById(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetReleasesByProject() {
        // Simuler la récupération des versions par ID de projet
        List<Release> releases = Arrays.asList(release);
        when(releaseService.getReleasesByProject(1)).thenReturn(releases);

        // Appeler la méthode du contrôleur
        List<Release> response = releaseController.getReleasesByProject(1).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'il y a une version dans la réponse
        assertEquals(release.getId(), response.get(0).getId()); // Vérifie l'ID de la version
        verify(releaseService, times(1)).getReleasesByProject(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testCreateRelease() {
        // Simuler la création d'une nouvelle version
        when(releaseService.createRelease(any(Release.class))).thenReturn(release);

        // Appeler la méthode du contrôleur
        Release response = releaseController.createRelease(release);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(release.getId(), response.getId()); // Vérifie l'ID de la version
        verify(releaseService, times(1)).createRelease(any(Release.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testUpdateRelease() {
        // Simuler la mise à jour d'une version
        when(releaseService.updateRelease(any(Release.class))).thenReturn(release);

        // Appeler la méthode du contrôleur
        Release response = releaseController.updateRelease(1, release);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(release.getId(), response.getId()); // Vérifie l'ID de la version
        verify(releaseService, times(1)).updateRelease(any(Release.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testDeleteRelease() {
        // Simuler la suppression d'une version
        doNothing().when(releaseService).deleteRelease(1);

        // Appeler la méthode du contrôleur
        releaseController.deleteRelease(1);

        // Vérifications
        verify(releaseService, times(1)).deleteRelease(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testAddSprintToRelease() {
        // Simuler l'ajout d'un sprint à une version
        doNothing().when(releaseService).addSprintToRelease(1, 1);

        // Appeler la méthode du contrôleur
        releaseController.addSprintToRelease(1, 1);

        // Vérifications
        verify(releaseService, times(1)).addSprintToRelease(1, 1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testRemoveSprintFromRelease() {
        // Simuler la suppression d'un sprint d'une version
        doNothing().when(releaseService).removeSprintFromRelease(1, 1);

        // Appeler la méthode du contrôleur
        releaseController.removeSprintFromRelease(1, 1);

        // Vérifications
        verify(releaseService, times(1)).removeSprintFromRelease(1, 1); // Vérifie que la méthode du service a été appelée
    }
}
