package com.ubforge.ubforge.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.ubforge.ubforge.events.TaskStatusChangedEvent;
import com.ubforge.ubforge.model.Task;
import com.ubforge.ubforge.model.User;
import com.ubforge.ubforge.repository.TaskRepository;
import com.ubforge.ubforge.repository.UserRepository;
import com.ubforge.ubforge.model.TaskStatus;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public Task createTask(Task task) {
        if (task.getIssue() != null) {
            // Ensure bidirectional relationship
            task.getIssue().getTasks().add(task);
        }
        return taskRepository.save(task);
    }

    public Task getTaskById(int id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public List<Task> getTasksByProject(int projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    public Task updateTask(int id, Task task) {
        if (taskRepository.existsById(id)) {
            task.setId(id);

            Task existingTask = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));

            if (task.getIssue() == null) {
                task.setIssue(existingTask.getIssue());
            }

            return taskRepository.save(task);
        }
        return null;
    }

    public void deleteTask(int id) {
        taskRepository.deleteById(id);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task assignTaskToUser(int taskId, int userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<User> assignedUsers = task.getAssignedTo();
        if (assignedUsers == null) {
            assignedUsers = new ArrayList<>();
        }
        assignedUsers.add(user);
        task.setAssignedTo(assignedUsers);

        return taskRepository.save(task);
    }

    public Task updateTaskStatus(int taskId, TaskStatus status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);
        Task updatedTask = taskRepository.save(task);

        // Publish an event after updating the task status
        eventPublisher.publishEvent(new TaskStatusChangedEvent(this, updatedTask));

        return updatedTask;
    }
}
