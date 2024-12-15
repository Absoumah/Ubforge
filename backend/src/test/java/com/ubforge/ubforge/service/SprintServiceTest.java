package com.ubforge.ubforge.service;

import com.ubforge.ubforge.model.Sprint;
import com.ubforge.ubforge.model.SprintStatus;
import com.ubforge.ubforge.model.Task;
import com.ubforge.ubforge.model.TaskStatus;
import com.ubforge.ubforge.repository.SprintRepository;
import com.ubforge.ubforge.model.Issue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SprintServiceTest {

    @Mock
    private SprintRepository sprintRepository;

    @Mock
    private IssueService issueService;

    @InjectMocks
    private SprintService sprintService;

    private Sprint sprint;
    private Issue issue;
    private Task task;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un sprint pour les tests
        sprint = new Sprint();
        sprint.setId(1);
        sprint.setStatus(SprintStatus.PLANNED);
        sprint.setProjectId(101);
        sprint.setIssues(new ArrayList<>());

        // Initialisation d'un issue pour les tests
        issue = new Issue();
        issue.setId(1);
        issue.setTasks(new ArrayList<>());

        // Initialisation d'une tâche pour les tests
        task = new Task();
        task.setId(1);
        task.setStatus(TaskStatus.COMPLETED);
        issue.getTasks().add(task);
        sprint.getIssues().add(issue.getId());

        // Simuler le comportement du repository
        when(sprintRepository.findById(1)).thenReturn(Optional.of(sprint));
    }

    @Test
    void testCreateSprint() {
        // Simuler la sauvegarde d'un sprint
        when(sprintRepository.save(any(Sprint.class))).thenReturn(sprint);

        // Appeler la méthode du service
        Sprint response = sprintService.createSprint(sprint);

        // Vérifications
        assertNotNull(response);
        assertEquals(sprint.getId(), response.getId());
        verify(sprintRepository, times(1)).save(any(Sprint.class));
    }

    @Test
    void testGetSprintById() {
        // Appeler la méthode du service
        Sprint response = sprintService.getSprintById(1);

        // Vérifications
        assertNotNull(response);
        assertEquals(sprint.getId(), response.getId());
        verify(sprintRepository, times(1)).findById(1);
    }

    @Test
    void testGetSprintsByProject() {
        // Simuler le comportement du repository
        List<Sprint> sprints = Arrays.asList(sprint);
        when(sprintRepository.findByProjectId(101)).thenReturn(sprints);

        // Appeler la méthode du service
        List<Sprint> response = sprintService.getSprintsByProject(101);

        // Vérifications
        assertNotNull(response);
        assertEquals(1, response.size());
        assertEquals(sprint.getId(), response.get(0).getId());
        verify(sprintRepository, times(1)).findByProjectId(101);
    }

    @Test
    void testAddTaskToSprint() {
        // Simuler l'ajout d'une tâche au sprint
        when(sprintRepository.save(any(Sprint.class))).thenReturn(sprint);

        // Ajouter une tâche
        sprintService.addTaskToSprint(1, task.getId());

        // Vérifications
        assertTrue(sprint.getTasks().contains(task.getId()));
        verify(sprintRepository, times(1)).save(sprint);
    }

    @Test
    void testRemoveTaskFromSprint() {
        // Simuler la suppression d'une tâche du sprint
        when(sprintRepository.save(any(Sprint.class))).thenReturn(sprint);

        // Retirer une tâche
        sprintService.removeTaskFromSprint(1, task.getId());

        // Vérifications
        assertFalse(sprint.getTasks().contains(task.getId()));
        verify(sprintRepository, times(1)).save(sprint);
    }

    @Test
    void testUpdateSprintStatus() {
        // Simuler l'appel à updateSprintStatus
        when(issueService.getIssueById(anyInt())).thenReturn(issue);

        // Appeler la méthode du service
        sprintService.updateSprintStatus(1);

        // Vérifications
        assertEquals(SprintStatus.COMPLETED, sprint.getStatus());
        verify(sprintRepository, times(1)).save(sprint);
    }


    @Test
    void testUpdateSprintStatusNoTasks() {
        // Simuler une liste vide de tâches
        sprint.setIssues(new ArrayList<>());

        // Appeler la méthode du service
        sprintService.updateSprintStatus(1);

        // Vérifications
        assertEquals(SprintStatus.PLANNED, sprint.getStatus());
        verify(sprintRepository, times(1)).save(sprint);
    }
}
