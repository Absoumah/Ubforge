package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Sprint;
import com.ubforge.ubforge.service.SprintService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

class SprintControllerTest {

    @Mock
    private SprintService sprintService;

    @InjectMocks
    private SprintController sprintController;

    private Sprint sprint;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un sprint pour les tests
        sprint = new Sprint();
        sprint.setId(1);
        sprint.setName("Test Sprint");
    }

    @Test
    void testCreateSprint() {
        // Simuler la création d'un sprint
        when(sprintService.createSprint(any(Sprint.class))).thenReturn(sprint);

        // Appeler la méthode du contrôleur
        Sprint response = sprintController.createSprint(sprint).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(sprint.getId(), response.getId()); // Vérifie l'ID du sprint
        assertEquals(sprint.getName(), response.getName()); // Vérifie le nom du sprint
        verify(sprintService, times(1)).createSprint(any(Sprint.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetAllSprints() {
        // Simuler la récupération de tous les sprints
        List<Sprint> sprints = Arrays.asList(sprint);
        when(sprintService.getAllSprints()).thenReturn(sprints);

        // Appeler la méthode du contrôleur
        List<Sprint> response = sprintController.getAllSprints().getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'il y a un sprint dans la réponse
        assertEquals(sprint.getId(), response.get(0).getId()); // Vérifie l'ID du sprint
        verify(sprintService, times(1)).getAllSprints(); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetSprintById() {
        // Simuler la récupération d'un sprint par ID
        when(sprintService.getSprintById(1)).thenReturn(sprint);

        // Appeler la méthode du contrôleur
        Sprint response = sprintController.getSprintById(1).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(sprint.getId(), response.getId()); // Vérifie l'ID du sprint
        verify(sprintService, times(1)).getSprintById(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetSprintsByProject() {
        // Simuler la récupération des sprints par ID de projet
        List<Sprint> sprints = Arrays.asList(sprint);
        when(sprintService.getSprintsByProject(1)).thenReturn(sprints);

        // Appeler la méthode du contrôleur
        List<Sprint> response = sprintController.getSprintsByProject(1).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'il y a un sprint dans la réponse
        assertEquals(sprint.getId(), response.get(0).getId()); // Vérifie l'ID du sprint
        verify(sprintService, times(1)).getSprintsByProject(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testUpdateSprint() {
        // Simuler la mise à jour d'un sprint
        when(sprintService.updateSprint(1, sprint)).thenReturn(sprint);

        // Appeler la méthode du contrôleur
        Sprint response = sprintController.updateSprint(1, sprint).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(sprint.getId(), response.getId()); // Vérifie l'ID du sprint
        verify(sprintService, times(1)).updateSprint(1, sprint); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testDeleteSprint() {
        // Simuler la suppression d'un sprint
        doNothing().when(sprintService).deleteSprint(1);

        // Appeler la méthode du contrôleur
        sprintController.deleteSprint(1);

        // Vérifications
        verify(sprintService, times(1)).deleteSprint(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testAddTaskToSprint() {
        // Simuler l'ajout d'une tâche à un sprint
        doNothing().when(sprintService).addTaskToSprint(1, 1);

        // Appeler la méthode du contrôleur
        sprintController.addTaskToSprint(1, 1);

        // Vérifications
        verify(sprintService, times(1)).addTaskToSprint(1, 1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetSprintProgress() {
        // Simuler le calcul du progrès du sprint
        when(sprintService.calculateSprintProgress(1)).thenReturn(75.0);

        // Appeler la méthode du contrôleur
        Double response = sprintController.getSprintProgress(1).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(75.0, response); // Vérifie que le progrès du sprint est correct
        verify(sprintService, times(1)).calculateSprintProgress(1); // Vérifie que la méthode du service a été appelée
    }
}
