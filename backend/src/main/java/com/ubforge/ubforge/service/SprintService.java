package com.ubforge.ubforge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.ubforge.ubforge.events.TaskStatusChangedEvent;
import com.ubforge.ubforge.model.Issue;
import com.ubforge.ubforge.model.Sprint;
import com.ubforge.ubforge.model.SprintStatus;
import com.ubforge.ubforge.model.Task;
import com.ubforge.ubforge.model.TaskStatus;
import com.ubforge.ubforge.repository.SprintRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SprintService {
    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private IssueService issueService;

    @Autowired
    private TaskService taskService;

    @EventListener
    public void handleTaskStatusChanged(TaskStatusChangedEvent event) {
        Task task = event.getTask();
        Issue issue = task.getIssue();
        if (issue != null) {
            List<Sprint> sprints = getSprintsByIssueId(issue.getId());
            for (Sprint sprint : sprints) {
                updateSprintStatus(sprint.getId());
            }
        }
    }

    public Sprint createSprint(Sprint sprint) {
        return sprintRepository.save(sprint);
    }

    public List<Sprint> getAllSprints() {
        return sprintRepository.findAll();
    }

    public Sprint getSprintById(int id) {
        return sprintRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Sprint not found"));
    }

    public List<Sprint> getSprintsByProject(int projectId) {
        return sprintRepository.findByProjectId(projectId);
    }

    public Sprint updateSprint(int id, Sprint sprint) {
        if (sprintRepository.existsById(id)) {
            sprint.setId(id);
            return sprintRepository.save(sprint);
        }
        throw new RuntimeException("Sprint not found");
    }

    public void deleteSprint(int id) {
        sprintRepository.deleteById(id);
    }

    public void addTaskToSprint(int sprintId, int taskId) {
        Sprint sprint = getSprintById(sprintId);
        if (!sprint.getTasks().contains(taskId)) {
            sprint.getTasks().add(taskId);
            sprintRepository.save(sprint);
        }
    }

    public void removeTaskFromSprint(int sprintId, int taskId) {
        Sprint sprint = getSprintById(sprintId);
        sprint.getTasks().remove(Integer.valueOf(taskId));
        sprintRepository.save(sprint);
    }

    public void addIssueToSprint(int sprintId, int issueId) {
        Sprint sprint = getSprintById(sprintId);
        if (!sprint.getIssues().contains(issueId)) {
            sprint.getIssues().add(issueId);
            sprintRepository.save(sprint);
        }
    }

    public void removeIssueFromSprint(int sprintId, int issueId) {
        Sprint sprint = getSprintById(sprintId);
        sprint.getIssues().remove(Integer.valueOf(issueId));
        sprintRepository.save(sprint);
    }

    public double calculateSprintProgress(int sprintId) {
        Sprint sprint = getSprintById(sprintId);
        List<Integer> issueIds = sprint.getIssues();

        if (issueIds == null || issueIds.isEmpty()) {
            return 0.0;
        }

        List<Task> allTasks = new ArrayList<>();
        for (int issueId : issueIds) {
            Issue issue = issueService.getIssueById(issueId);
            allTasks.addAll(issue.getTasks());
        }

        if (allTasks.isEmpty()) {
            return 0.0;
        }

        long completedTasks = allTasks.stream()
            .filter(task -> task.getStatus() == TaskStatus.COMPLETED)
            .count();

        return ((double) completedTasks / allTasks.size()) * 100;
    }

    public int getTotalTasksForSprint(int sprintId) {
        Sprint sprint = getSprintById(sprintId);
        List<Integer> issueIds = sprint.getIssues();

        if (issueIds == null || issueIds.isEmpty()) {
            return 0;
        }

        int totalTasks = 0;
        for (int issueId : issueIds) {
            Issue issue = issueService.getIssueById(issueId);
            totalTasks += issue.getTasks().size();
        }

        return totalTasks;
    }

    public void updateSprintStatus(int sprintId) {
        Sprint sprint = getSprintById(sprintId);
        List<Integer> issueIds = sprint.getIssues();

        if (issueIds == null || issueIds.isEmpty()) {
            sprint.setStatus(SprintStatus.PLANNED);
            sprintRepository.save(sprint);
            return;
        }

        List<Task> allTasks = new ArrayList<>();
        for (int issueId : issueIds) {
            Issue issue = issueService.getIssueById(issueId);
            allTasks.addAll(issue.getTasks());
        }

        if (allTasks.isEmpty()) {
            sprint.setStatus(SprintStatus.PLANNED);
            sprintRepository.save(sprint);
            return;
        }

        boolean allCompleted = true;
        boolean anyInProgress = false;

        for (Task task : allTasks) {
            if (task.getStatus() != TaskStatus.COMPLETED) {
                allCompleted = false;
            }
            if (task.getStatus() == TaskStatus.IN_PROGRESS) {
                anyInProgress = true;
            }
        }

        if (allCompleted) {
            sprint.setStatus(SprintStatus.COMPLETED);
        } else if (anyInProgress) {
            sprint.setStatus(SprintStatus.ACTIVE);
        } else {
            sprint.setStatus(SprintStatus.PLANNED);
        }

        sprintRepository.save(sprint);
    }

    public List<Sprint> getSprintsByIssueId(int issueId) {
    return sprintRepository.findAll().stream()
        .filter(sprint -> sprint.getIssues().contains(issueId))
        .collect(Collectors.toList());
    }   
}