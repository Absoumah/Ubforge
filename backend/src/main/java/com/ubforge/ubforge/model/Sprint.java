package com.ubforge.ubforge.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sprints")
public class Sprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private SprintStatus status;

    @Column(name = "project_id")
    private int projectId;

    @ElementCollection
    @CollectionTable(name = "sprint_tasks", 
        joinColumns = @JoinColumn(name = "sprint_id"))
    @Column(name = "task_id")
    private List<Integer> tasks = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "sprint_issues", 
        joinColumns = @JoinColumn(name = "sprint_id"))
    @Column(name = "issue_id")
    private List<Integer> issues = new ArrayList<>();

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public SprintStatus getStatus() {
        return status;
    }

    public void setStatus(SprintStatus status) {
        this.status = status;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public List<Integer> getTasks() {
        return tasks;
    }

    public void setTasks(List<Integer> tasks) {
        this.tasks = tasks;
    }

    public List<Integer> getIssues() {
        return issues;
    }

    public void setIssues(List<Integer> issues) {
        this.issues = issues;
    }
}