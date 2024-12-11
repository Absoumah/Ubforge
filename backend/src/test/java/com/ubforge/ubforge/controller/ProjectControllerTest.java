package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
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

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateProject() {
        Project project = new Project();
        project.setId(1);
        project.setTitle("Test Project");
        when(projectService.createProject(any(Project.class))).thenReturn(project);
        ResponseEntity<Void> response = projectController.createProject(project);
        assertEquals(HttpStatus.CREATED, response.getStatusCode()); // Vérifie que le statut est 201.
        assertTrue(response.getHeaders().getLocation().toString().contains("/project/1")); // Vérifie que l'URI est correct.
        verify(projectService, times(1)).createProject(project); // Vérifie que le service a été appelé une fois.
    }

    @Test
    void testGetProjectById() {
        Project project = new Project();
        project.setId(1);
        when(projectService.getProjectById(1)).thenReturn(Optional.of(project));
        ResponseEntity<Optional<Project>> response = projectController.getProjectById(1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isPresent());
        assertEquals(project, response.getBody().get());
        verify(projectService, times(1)).getProjectById(1);
    }

    @Test
    void testGetAllProjects() {
        Project project1 = new Project();
        Project project2 = new Project();
        when(projectService.getAllProjects()).thenReturn(Arrays.asList(project1, project2));

        ResponseEntity<Iterable<Project>> response = projectController.getAllProjects();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof Iterable);
        assertEquals(2, ((Iterable<?>) response.getBody()).spliterator().getExactSizeIfKnown());
        verify(projectService, times(1)).getAllProjects();
    }

    @Test
    void testUpdateProject() {
        Project project = new Project();
        project.setId(1);
        project.setTitle("Updated Project");
        doNothing().when(projectService).updateProject(eq(1), any(Project.class));
        ResponseEntity<Void> response = projectController.updateProject(1, project);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(projectService, times(1)).updateProject(eq(1), eq(project));
    }


    @Test
    void testDeleteProject() {
        int projectId = 1;
        doNothing().when(projectService).deleteProject(projectId);
        ResponseEntity<Void> response = projectController.deleteProject(projectId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(projectService, times(1)).deleteProject(projectId);
    }
}