package com.ubforge.ubforge.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Project;
import com.ubforge.ubforge.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    private Project project;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un objet Project pour les tests
        project = new Project();
        project.setId(1);
        project.setName("Test Project");
        project.setDescription("This is a test project.");
        // Add other necessary properties for your Project model
    }

    @Test
    void testCreateProject() {
        // Simuler la sauvegarde d'un projet
        when(projectRepository.save(any(Project.class))).thenReturn(project);

        // Appeler la méthode du service
        Project response = projectService.createProject(project);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(project.getId(), response.getId()); // Vérifie l'ID du projet
        assertEquals(project.getName(), response.getName()); // Vérifie le nom du projet
        verify(projectRepository, times(1)).save(any(Project.class)); // Vérifie que la méthode save a été appelée
    }

    @Test
    void testGetAllProjects() {
        // Simuler la récupération de tous les projets
        when(projectRepository.findAll()).thenReturn(Arrays.asList(project));

        // Appeler la méthode du service
        List<Project> response = projectService.getAllProjects();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'un projet est retourné
        assertEquals(project.getId(), response.get(0).getId()); // Vérifie l'ID du projet
        verify(projectRepository, times(1)).findAll(); // Vérifie que la méthode findAll a été appelée
    }

    @Test
    void testGetProjectById() {
        // Simuler la récupération d'un projet par son ID
        when(projectRepository.findById(1)).thenReturn(Optional.of(project));

        // Appeler la méthode du service
        Optional<Project> response = projectService.getProjectById(1);

        // Vérifications
        assertTrue(response.isPresent()); // Vérifie que le projet est présent
        assertEquals(project.getId(), response.get().getId()); // Vérifie l'ID du projet
        verify(projectRepository, times(1)).findById(1); // Vérifie que la méthode findById a été appelée
    }

    @Test
    void testGetProjectByIdNotFound() {
        // Simuler le cas où le projet n'est pas trouvé
        when(projectRepository.findById(1)).thenReturn(Optional.empty());

        // Appeler la méthode du service
        Optional<Project> response = projectService.getProjectById(1);

        // Vérifications
        assertFalse(response.isPresent()); // Vérifie que le projet n'est pas présent
        verify(projectRepository, times(1)).findById(1); // Vérifie que la méthode findById a été appelée
    }

    @Test
    void testUpdateProject() {
        // Simuler la récupération d'un projet par ID et sa mise à jour
        when(projectRepository.existsById(1)).thenReturn(true);
        when(projectRepository.save(any(Project.class))).thenReturn(project);

        // Appeler la méthode du service
        projectService.updateProject(1, project);

        // Vérifications
        verify(projectRepository, times(1)).save(any(Project.class)); // Vérifie que la méthode save a été appelée
    }

    @Test
    void testUpdateProjectNotFound() {
        // Simuler le cas où le projet n'existe pas
        when(projectRepository.existsById(1)).thenReturn(false);

        // Appeler la méthode du service
        projectService.updateProject(1, project);

        // Vérifications
        verify(projectRepository, times(0)).save(any(Project.class)); // Vérifie que la méthode save n'a pas été appelée
    }

    @Test
    void testDeleteProject() {
        // Simuler la suppression d'un projet
        doNothing().when(projectRepository).deleteById(1);

        // Appeler la méthode du service
        projectService.deleteProject(1);

        // Vérifications
        verify(projectRepository, times(1)).deleteById(1); // Vérifie que la méthode deleteById a été appelée
    }
}
