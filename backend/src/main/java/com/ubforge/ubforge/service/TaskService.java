package com.ubforge.ubforge.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ubforge.ubforge.model.Task;
import com.ubforge.ubforge.model.User;
import com.ubforge.ubforge.repository.TaskRepository;
import com.ubforge.ubforge.repository.UserRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task getTaskById(int id) {
        return taskRepository.findById(id).get();
    }

    public Task updateTask(int id, Task task) {
        if (taskRepository.existsById(id)) {
            task.setId(id);
            taskRepository.save(task);
        }
        return taskRepository.save(task);
    }

    public void deleteTask(int id) {
        taskRepository.deleteById(id);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Iterable<Task> getTaskByUserId(int id) {
        return taskRepository.findByAssignToId(id);
    }

    public Iterable<Task> getTasksByIssueId(int issueId) {
        return taskRepository.findTasksByIssueId(issueId);

    }

    public Task assignTaskToUser(int taskId, int userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        task.setAssignTo(user);
        return taskRepository.save(task);
    }

    public Task updateTaskStatus(int taskId, String status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);
        return taskRepository.save(task);
    }

    public Task addToRelease(int taskId, int releaseId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setReleaseId(releaseId);
        return taskRepository.save(task);
    }
}
