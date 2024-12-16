package com.ubforge.ubforge.service;

import com.ubforge.ubforge.events.TaskStatusChangedEvent;
import com.ubforge.ubforge.model.Task;
import com.ubforge.ubforge.model.User;
import com.ubforge.ubforge.model.TaskStatus;
import com.ubforge.ubforge.repository.TaskRepository;
import com.ubforge.ubforge.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.context.ApplicationEventPublisher;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ApplicationEventPublisher eventPublisher;

    @InjectMocks
    private TaskService taskService;

    private Task task;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialiser une tâche pour les tests
        task = new Task();
        task.setId(1);
        task.setName("Test Task");
        task.setStatus(TaskStatus.COMPLETED);

        // Mocker les comportements du repository
        when(taskRepository.findById(1)).thenReturn(Optional.of(task));
        when(taskRepository.existsById(1)).thenReturn(true);
    }

    @Test
    void testCreateTask() {
        // Simuler la sauvegarde
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // Appeler la méthode
        Task createdTask = taskService.createTask(task);

        // Vérifications
        assertNotNull(createdTask);
        assertEquals(task.getId(), createdTask.getId());
        assertEquals("Test Task", createdTask.getName());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void testGetTaskById() {
        // Appeler la méthode
        Task fetchedTask = taskService.getTaskById(1);

        // Vérifications
        assertNotNull(fetchedTask);
        assertEquals(task.getId(), fetchedTask.getId());
        assertEquals("Test Task", fetchedTask.getName());
        verify(taskRepository, times(1)).findById(1);
    }

    @Test
    void testGetTasksByProject() {
        // Simuler une liste de tâches pour un projet
        Task secondTask = new Task();
        secondTask.setId(2);
        secondTask.setName("Second Task");
        secondTask.setStatus(TaskStatus.COMPLETED);
        List<Task> tasks = Arrays.asList(task, secondTask);
        when(taskRepository.findByProjectId(101)).thenReturn(tasks);

        // Appeler la méthode
        List<Task> fetchedTasks = taskService.getTasksByProject(101);

        // Vérifications
        assertNotNull(fetchedTasks);
        assertEquals(2, fetchedTasks.size());
        assertEquals("Second Task", fetchedTasks.get(1).getName());
        verify(taskRepository, times(1)).findByProjectId(101);
    }

    @Test
    void testUpdateTask() {
        // Modifier la tâche
        task.setName("Updated Task");

        // Simuler la sauvegarde
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // Appeler la méthode
        Task updatedTask = taskService.updateTask(1, task);

        // Vérifications
        assertNotNull(updatedTask);
        assertEquals("Updated Task", updatedTask.getName());
        verify(taskRepository, times(1)).existsById(1);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void testDeleteTask() {
        // Appeler la méthode
        taskService.deleteTask(1);

        // Vérifications
        verify(taskRepository, times(1)).deleteById(1);
    }

    @Test
    void testAssignTaskToUser() {
        // Simuler un utilisateur
        User user = new User();
        user.setId(100);
        user.setFirstName("John Doe");

        when(userRepository.findById(100)).thenReturn(Optional.of(user));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // Appeler la méthode
        Task updatedTask = taskService.assignTaskToUser(1, 100);

        // Vérifications
        assertNotNull(updatedTask.getAssignedTo());
        assertEquals(1, updatedTask.getAssignedTo().size());
        assertEquals("John Doe", updatedTask.getAssignedTo().get(0).getFirstName());
        verify(userRepository, times(1)).findById(100);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void testUpdateTaskStatus() {
        // Simuler la mise à jour de l'état
        Task updatedTask = new Task();
        updatedTask.setId(1);
        updatedTask.setName("Test Task");
        updatedTask.setStatus(TaskStatus.IN_PROGRESS);

        when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);

        // Appeler la méthode
        Task resultTask = taskService.updateTaskStatus(1, TaskStatus.IN_PROGRESS);

        // Vérifications
        assertNotNull(resultTask);
        assertEquals(TaskStatus.IN_PROGRESS, resultTask.getStatus());
        verify(taskRepository, times(1)).findById(1);
        verify(taskRepository, times(1)).save(task);

        // Vérifier la publication de l'événement
        verify(eventPublisher, times(1)).publishEvent(any(TaskStatusChangedEvent.class));
    }

    @Test
    void testGetAllTasks() {
        // Simuler une liste de tâches
        Task anotherTask = new Task();
        anotherTask.setId(2);
        anotherTask.setName("Another Task");
        anotherTask.setStatus(TaskStatus.COMPLETED);
        List<Task> tasks = Arrays.asList(task, anotherTask);
        when(taskRepository.findAll()).thenReturn(tasks);

        // Appeler la méthode
        List<Task> allTasks = taskService.getAllTasks();

        // Vérifications
        assertNotNull(allTasks);
        assertEquals(2, allTasks.size());
        assertEquals("Another Task", allTasks.get(1).getName());
        verify(taskRepository, times(1)).findAll();
    }
}
