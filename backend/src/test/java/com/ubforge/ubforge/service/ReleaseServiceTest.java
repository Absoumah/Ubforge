package com.ubforge.ubforge.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Release;
import com.ubforge.ubforge.repository.ReleaseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

class ReleaseServiceTest {

    @Mock
    private ReleaseRepository releaseRepository;

    @InjectMocks
    private ReleaseService releaseService;

    private Release release;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'une release pour les tests
        release = new Release();
        release.setId(1);
        release.setName("Sample Release");
        release.setStatus("In Progress");
    }

    @Test
    void testGetAllReleases() {
        // Simuler la récupération de toutes les releases
        List<Release> releases = Arrays.asList(release);
        when(releaseRepository.findAll()).thenReturn(releases);

        // Appeler la méthode getAllReleases
        List<Release> result = releaseService.getAllReleases();

        // Vérifications
        assertNotNull(result); // Vérifie que la liste des releases n'est pas nulle
        assertFalse(result.isEmpty()); // Vérifie que la liste n'est pas vide
        assertEquals(1, result.size()); // Vérifie qu'il y a une seule release
        assertEquals("Sample Release", result.get(0).getName()); // Vérifie que le nom est correct
        verify(releaseRepository, times(1)).findAll(); // Vérifie que findAll a été appelé une fois
    }

    @Test
    void testGetReleaseById() {
        // Simuler la récupération d'une release par ID
        when(releaseRepository.findById(1)).thenReturn(Optional.of(release));

        // Appeler la méthode getReleaseById
        Release result = releaseService.getReleaseById(1);

        // Vérifications
        assertNotNull(result); // Vérifie que la release n'est pas nulle
        assertEquals(release.getId(), result.getId()); // Vérifie que l'ID est correct
        assertEquals("Sample Release", result.getName()); // Vérifie que le nom est correct
        verify(releaseRepository, times(1)).findById(1); // Vérifie que findById a été appelé une fois
    }

    @Test
    void testCreateRelease() {
        // Simuler la création d'une release
        when(releaseRepository.save(any(Release.class))).thenReturn(release);

        // Appeler la méthode createRelease
        Release createdRelease = releaseService.createRelease(release);

        // Vérifications
        assertNotNull(createdRelease); // Vérifie que la release créée n'est pas nulle
        assertEquals(release.getId(), createdRelease.getId()); // Vérifie que l'ID est correct
        assertEquals(release.getName(), createdRelease.getName()); // Vérifie que le nom est correct
        verify(releaseRepository, times(1)).save(any(Release.class)); // Vérifie que save a été appelé une fois
    }

    @Test
    void testDeleteRelease() {
        // Simuler la suppression d'une release
        doNothing().when(releaseRepository).deleteById(1);

        // Appeler la méthode deleteRelease
        releaseService.deleteRelease(1);

        // Vérifications
        verify(releaseRepository, times(1)).deleteById(1); // Vérifie que deleteById a été appelé une fois
    }

    @Test
    void testGetReleaseStatus() {
        // Simuler la récupération du statut d'une release
        when(releaseRepository.findById(1)).thenReturn(Optional.of(release));

        // Appeler la méthode getReleaseStatus
        String status = releaseService.getReleaseById(1).getStatus();

        // Vérifications
        assertNotNull(status); // Vérifie que le statut n'est pas nul
        assertEquals("In Progress", status); // Vérifie que le statut est correct
        verify(releaseRepository, times(1)).findById(1); // Vérifie que findById a été appelé une fois
    }
}