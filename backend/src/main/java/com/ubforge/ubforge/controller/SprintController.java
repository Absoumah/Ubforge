package com.ubforge.ubforge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ubforge.ubforge.model.Sprint;
import com.ubforge.ubforge.service.SprintService;
import java.util.List;

@RestController
@RequestMapping("/sprint")
public class SprintController {
    @Autowired
    private SprintService sprintService;

    @PostMapping("/create")
    public ResponseEntity<Sprint> createSprint(@RequestBody Sprint sprint) {
        return ResponseEntity.ok(sprintService.createSprint(sprint));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Sprint>> getAllSprints() {
        return ResponseEntity.ok(sprintService.getAllSprints());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Sprint> getSprintById(@PathVariable int id) {
        return ResponseEntity.ok(sprintService.getSprintById(id));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Sprint>> getSprintsByProject(@PathVariable int projectId) {
        return ResponseEntity.ok(sprintService.getSprintsByProject(projectId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Sprint> updateSprint(@PathVariable int id, @RequestBody Sprint sprint) {
        return ResponseEntity.ok(sprintService.updateSprint(id, sprint));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSprint(@PathVariable int id) {
        sprintService.deleteSprint(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{sprintId}/addTask/{taskId}")
    public ResponseEntity<Void> addTaskToSprint(@PathVariable int sprintId, @PathVariable int taskId) {
        sprintService.addTaskToSprint(sprintId, taskId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{sprintId}/removeTask/{taskId}")
    public ResponseEntity<Void> removeTaskFromSprint(@PathVariable int sprintId, @PathVariable int taskId) {
        sprintService.removeTaskFromSprint(sprintId, taskId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{sprintId}/addIssue/{issueId}")
    public ResponseEntity<Void> addIssueToSprint(@PathVariable int sprintId, @PathVariable int issueId) {
        sprintService.addIssueToSprint(sprintId, issueId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{sprintId}/removeIssue/{issueId}")
    public ResponseEntity<Void> removeIssueFromSprint(@PathVariable int sprintId, @PathVariable int issueId) {
        sprintService.removeIssueFromSprint(sprintId, issueId);
        return ResponseEntity.ok().build();
    }
}