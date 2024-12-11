package com.ubforge.ubforge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.ubforge.ubforge.model.Task;
import com.ubforge.ubforge.service.TaskService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ubforge.ubforge.model.TaskStatus;




//to do permission
@RestController
@RequestMapping("task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<Void> createTask(@RequestBody Task task) {
        taskService.createTask(task);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getAll")
    public ResponseEntity<Iterable<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/getTasksByUserId/{id}")
    public ResponseEntity<Iterable<Task>> getTasksByUserId(@PathVariable int id) {
        return ResponseEntity.ok(taskService.getTaskByUserId(id));
        
    }
    

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateTask(@PathVariable int id, @RequestBody Task task) {
        taskService.updateTask(id,task);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable int id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable int id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    //get tasks by issue id
    @GetMapping("/getByIssueId/{issueId}")
    public ResponseEntity<Iterable<Task>> getTasksByIssueId(@PathVariable int issueId) {
        return ResponseEntity.ok(taskService.getTasksByIssueId(issueId));
    }

    //assign task to user
    @PutMapping("/assignTaskToUser/{taskId}/{userId}")
    public ResponseEntity<Task> assignTaskToUser(@PathVariable int taskId, @PathVariable int userId) {
        return ResponseEntity.ok(taskService.assignTaskToUser(taskId, userId));
    }

    //update task status
    @PutMapping("/updateStatus/{taskId}/{status}")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable int taskId, @PathVariable TaskStatus status) {
        return ResponseEntity.ok(taskService.updateTaskStatus(taskId, status));
    }

    //add task to release
    @PutMapping("/addToRelease/{taskId}/{releaseId}")
    public ResponseEntity<Task> addToRelease(@PathVariable int taskId, @PathVariable int releaseId) {
        return ResponseEntity.ok(taskService.addToRelease(taskId, releaseId));
    }



}
