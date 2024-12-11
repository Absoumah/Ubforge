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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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

        // Initialisation d'un objet Release pour les tests
        release = new Release();
        release.setId(1);
        release.setName("Test Release");
        release.setStatus("In Progress");
    }

    @Test
    void testCreateRelease() {
        // Simulation de la création d'une release
        when(releaseService.createRelease(any(Release.class))).thenReturn(release);

        // Appel de la méthode du contrôleur
        Release createdRelease = releaseController.createRelease(release);

        // Vérifications
        assertNotNull(createdRelease);
        assertEquals("Test Release", createdRelease.getName()); // Vérifie que le titre est correct
        verify(releaseService, times(1)).createRelease(any(Release.class)); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testGetAllReleases() {
        // Simulation de la récupération de toutes les releases
        when(releaseService.getAllReleases()).thenReturn(Arrays.asList(release));

        // Appel de la méthode du contrôleur
        List<Release> releases = releaseController.getAllReleases();

        // Vérifications
        assertNotNull(releases);
        assertEquals(1, releases.size()); // Vérifie qu'une seule release est retournée
        assertEquals("Test Release", releases.get(0).getName()); // Vérifie que la release retournée est correcte
        verify(releaseService, times(1)).getAllReleases(); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testGetReleaseById() {
        // Simulation de la récupération d'une release par ID
        when(releaseService.getReleaseById(1)).thenReturn(release);

        // Appel de la méthode du contrôleur
        Release foundRelease = releaseController.getReleaseById(1);

        // Vérifications
        assertNotNull(foundRelease);
        assertEquals("Test Release", foundRelease.getName()); // Vérifie que la release retournée est correcte
        verify(releaseService, times(1)).getReleaseById(1); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testGetReleaseStatus() {
        // Simulation de la récupération du status d'une release
        when(releaseService.getReleaseStatus(1)).thenReturn("In Progress");

        // Appel de la méthode du contrôleur
        String status = releaseController.getReleaseStatus(1);

        // Vérifications
        assertEquals("In Progress", status); // Vérifie que le status retourné est correct
        verify(releaseService, times(1)).getReleaseStatus(1); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testSetReleaseStatus() {
        // Simulation de la mise à jour du status d'une release
        when(releaseService.setReleaseStatus(1, "Completed")).thenReturn("Completed");

        // Appel de la méthode du contrôleur
        String updatedStatus = releaseController.setReleaseStatus(1, "Completed");

        // Vérifications
        assertEquals("Completed", updatedStatus); // Vérifie que le status retourné est correct
        verify(releaseService, times(1)).setReleaseStatus(1, "Completed"); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testDeleteRelease() {
        // Simulation de la suppression d'une release
        doNothing().when(releaseService).deleteRelease(1);

        // Appel de la méthode du contrôleur
        releaseController.deleteRelease(1);

        // Vérifications
        verify(releaseService, times(1)).deleteRelease(1); // Vérifie que le service a été appelé une fois
    }
}
