package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Project;
import com.ubforge.ubforge.service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Optional;

class ProjectControllerTest {

    @Mock
    private ProjectService projectService;

    @InjectMocks
    private ProjectController projectController;

    private Project project;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un projet pour les tests
        project = new Project();
        project.setId(1);
        project.setName("Test Project");
        project.setDescription("This is a test project");
    }

    @Test
    void testCreateProject() {
        // Simuler la création d'un projet
        when(projectService.createProject(any(Project.class))).thenReturn(project);

        // Appeler la méthode du contrôleur
        ResponseEntity<Void> response = projectController.createProject(project);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        verify(projectService, times(1)).createProject(any(Project.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetProjectById() {
        // Simuler la récupération d'un projet par ID
        when(projectService.getProjectById(1)).thenReturn(Optional.of(project));

        // Appeler la méthode du contrôleur
        ResponseEntity<Optional<Project>> response = projectController.getProjectById(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertTrue(response.getBody().isPresent()); // Vérifie que le projet est présent dans la réponse
        assertEquals(project.getId(), response.getBody().get().getId()); // Vérifie que l'ID du projet est correct
        verify(projectService, times(1)).getProjectById(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetAllProjects() {
        // Simuler la récupération de tous les projets
        when(projectService.getAllProjects()).thenReturn(Arrays.asList(project));

        // Appeler la méthode du contrôleur
        ResponseEntity<Iterable<Project>> response = projectController.getAllProjects();

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertTrue(response.getBody().iterator().hasNext()); // Vérifie qu'il y a des projets dans la liste
        verify(projectService, times(1)).getAllProjects(); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testUpdateProject() {
        // Simuler la mise à jour d'un projet
        doNothing().when(projectService).updateProject(eq(1), any(Project.class));

        // Appeler la méthode du contrôleur
        ResponseEntity<Void> response = projectController.updateProject(1, project);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        verify(projectService, times(1)).updateProject(eq(1), any(Project.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testDeleteProject() {
        // Simuler la suppression d'un projet
        doNothing().when(projectService).deleteProject(1);

        // Appeler la méthode du contrôleur
        ResponseEntity<Void> response = projectController.deleteProject(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        verify(projectService, times(1)).deleteProject(1); // Vérifie que la méthode du service a été appelée
    }
}