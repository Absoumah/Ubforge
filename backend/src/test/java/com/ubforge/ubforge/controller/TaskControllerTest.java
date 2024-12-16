package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Task;
import com.ubforge.ubforge.model.TaskStatus;
import com.ubforge.ubforge.service.TaskService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;


class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    private Task task;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'une tâche pour les tests
        task = new Task();
        task.setId(1);
        task.setName("Test Task");
        task.setDescription("Task description");
        task.setStatus(TaskStatus.COMPLETED);

    }

    @Test
    void testCreateTask() {
        // Simuler la création d'une nouvelle tâche
        when(taskService.createTask(any(Task.class))).thenReturn(task);

        // Appeler la méthode du contrôleur
        Task response = taskController.createTask(task).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(task.getId(), response.getId()); // Vérifie l'ID de la tâche
        verify(taskService, times(1)).createTask(any(Task.class)); // Vérifie que la méthode du service a été appelée

    }

    @Test
    void testGetAllTasks() {
        // Simuler la récupération de toutes les tâches
        List<Task> tasks = Arrays.asList(task);
        when(taskService.getAllTasks()).thenReturn(tasks);

        // Appeler la méthode du contrôleur
        List<Task> response = taskController.getAllTasks().getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'il y a une tâche dans la réponse
        assertEquals(task.getId(), response.get(0).getId()); // Vérifie l'ID de la tâche
        verify(taskService, times(1)).getAllTasks(); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetTasksByProject() {
        // Simuler la récupération des tâches par projet
        List<Task> tasks = Arrays.asList(task);
        when(taskService.getTasksByProject(1)).thenReturn(tasks);

        // Appeler la méthode du contrôleur
        List<Task> response = taskController.getTasksByProject(1).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'il y a une tâche dans la réponse
        assertEquals(task.getId(), response.get(0).getId()); // Vérifie l'ID de la tâche
        verify(taskService, times(1)).getTasksByProject(1); // Vérifie que la méthode du service a été appelée

    }

    @Test
    void testUpdateTask() {
        // Simuler la mise à jour d'une tâche
        when(taskService.updateTask(1, task)).thenReturn(task);

        // Appeler la méthode du contrôleur
        Task response = taskController.updateTask(1, task).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(task.getId(), response.getId()); // Vérifie l'ID de la tâche
        verify(taskService, times(1)).updateTask(1, task); // Vérifie que la méthode du service a été appelée

    }

    @Test
    void testDeleteTask() {
        // Simuler la suppression d'une tâche
        doNothing().when(taskService).deleteTask(1);

        // Appeler la méthode du contrôleur
        taskController.deleteTask(1);

        // Vérifications
        verify(taskService, times(1)).deleteTask(1); // Vérifie que la méthode du service a été appelée

    }

    @Test
    void testGetTaskById() {
        // Simuler la récupération d'une tâche par ID
        when(taskService.getTaskById(1)).thenReturn(task);

        // Appeler la méthode du contrôleur
        Task response = taskController.getTaskById(1).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(task.getId(), response.getId()); // Vérifie l'ID de la tâche
        verify(taskService, times(1)).getTaskById(1); // Vérifie que la méthode du service a été appelée

    }

    @Test
    void testAssignTaskToUser() {
        // Simuler l'affectation d'une tâche à un utilisateur
        when(taskService.assignTaskToUser(1, 1)).thenReturn(task);

        // Appeler la méthode du contrôleur
        Task response = taskController.assignTaskToUser(1, 1).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(task.getId(), response.getId()); // Vérifie l'ID de la tâche
        verify(taskService, times(1)).assignTaskToUser(1, 1); // Vérifie que la méthode du service a été appelée

    }

    @Test
    void testUpdateTaskStatus() {
        // Simuler la mise à jour du statut d'une tâche
        when(taskService.updateTaskStatus(1, TaskStatus.COMPLETED)).thenReturn(task);

        // Appeler la méthode du contrôleur
        Task response = taskController.updateTaskStatus(1, TaskStatus.COMPLETED).getBody();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(TaskStatus.COMPLETED, response.getStatus()); // Vérifie que le statut a bien été mis à jour
        verify(taskService, times(1)).updateTaskStatus(1, TaskStatus.COMPLETED); // Vérifie que la méthode du service a été appelée

    }
}
