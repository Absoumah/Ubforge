package com.ubforge.ubforge.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @Column(name = "category")
    private String category;

    @Column(name = "description")
    private String description;

    @ElementCollection
    @Column(name = "assigned_users")
    private List<User> assignedUsers;

    @ElementCollection
    @Column(name = "task_ids")
    private List<Integer> taskIds;

    @ElementCollection
    @Column(name = "issue_ids")
    private List<Integer> issueIds;

    // Getters and Setters
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<User> getAssignedUsers() {
        return assignedUsers;
    }

    public void setAssignedUsers(List<User> assignedUsers) {
        this.assignedUsers = assignedUsers;
    }

    public List<Integer> getTaskIds() {
        return taskIds;
    }

    public void setTaskIds(List<Integer> taskIds) {
        this.taskIds = taskIds;
    }

    public List<Integer> getIssueIds() {
        return issueIds;
    }

    public void setIssueIds(List<Integer> issueIds) {
        this.issueIds = issueIds;
    }
}
