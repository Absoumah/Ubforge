package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Task;
import com.ubforge.ubforge.service.TaskService;

import org.checkerframework.checker.units.qual.t;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;

class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    private Task task;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un objet Task pour les tests
        task = new Task();
        task.setId(1);
        task.setTask_title("Test Task");
        task.setTaskStatus("In Progress");
    }

    @Test
    void testCreateTask() {
        // Simulation de la création d'une tâche
        when(taskService.createTask(any(Task.class))).thenReturn(task);

        // Appel de la méthode du contrôleur
        ResponseEntity<Void> response = taskController.createTask(task);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que la réponse est OK
        verify(taskService, times(1)).createTask(any(Task.class)); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testGetAllTasks() {
        // Simulation de la récupération de toutes les tâches
        when(taskService.getAllTasks()).thenReturn(Arrays.asList(task));

        // Appel de la méthode du contrôleur
        ResponseEntity<Iterable<Task>> response = taskController.getAllTasks();

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(taskService, times(1)).getAllTasks(); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testGetTasksByUserId() {
        // Simulation de la récupération des tâches par ID utilisateur
        when(taskService.getTaskByUserId(1)).thenReturn(Arrays.asList(task));

        // Appel de la méthode du contrôleur
        ResponseEntity<Iterable<Task>> response = taskController.getTasksByUserId(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(taskService, times(1)).getTaskByUserId(1); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testUpdateTask() {
        // Simulation de la mise à jour d'une tâche
        task.setTask_title("Updated Task");
        when(taskService.updateTask(1, task)).thenReturn(task);

        // Appel de la méthode du contrôleur
        ResponseEntity<Void> response = taskController.updateTask(1, task);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que la réponse est OK
        verify(taskService, times(1)).updateTask(eq(1), any(Task.class)); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testDeleteTask() {
        // Simulation de la suppression d'une tâche
        doNothing().when(taskService).deleteTask(1);

        // Appel de la méthode du contrôleur
        ResponseEntity<Void> response = taskController.deleteTask(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que la réponse est OK
        verify(taskService, times(1)).deleteTask(1); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testGetTaskById() {
        // Simulation de la récupération d'une tâche par son ID
        when(taskService.getTaskById(1)).thenReturn(task);

        // Appel de la méthode du contrôleur
        ResponseEntity<Task> response = taskController.getTaskById(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(task, response.getBody()); // Vérifie que la tâche retournée est la bonne
        verify(taskService, times(1)).getTaskById(1); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testGetTasksByIssueId() {
        // Simulation de la récupération des tâches par ID d'issue
        when(taskService.getTasksByIssueId(1)).thenReturn(Arrays.asList(task));

        // Appel de la méthode du contrôleur
        ResponseEntity<Iterable<Task>> response = taskController.getTasksByIssueId(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(taskService, times(1)).getTasksByIssueId(1); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testAssignTaskToUser() {
        // Simulation de l'affectation d'une tâche à un utilisateur
        when(taskService.assignTaskToUser(1, 1)).thenReturn(task);

        // Appel de la méthode du contrôleur
        ResponseEntity<Task> response = taskController.assignTaskToUser(1, 1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(taskService, times(1)).assignTaskToUser(1, 1); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testUpdateTaskStatus() {
        // Simulation de la mise à jour du statut d'une tâche
        when(taskService.updateTaskStatus(1, "Completed")).thenReturn(task);

        // Appel de la méthode du contrôleur
        ResponseEntity<Task> response = taskController.updateTaskStatus(1, "Completed");

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(taskService, times(1)).updateTaskStatus(1, "Completed"); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testAddToRelease() {
        // Simulation de l'ajout d'une tâche à une release
        when(taskService.addToRelease(1, 1)).thenReturn(task);

        // Appel de la méthode du contrôleur
        ResponseEntity<Task> response = taskController.addToRelease(1, 1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(taskService, times(1)).addToRelease(1, 1); // Vérifie que le service a été appelé une fois
    }
}
