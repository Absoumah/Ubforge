package com.ubforge.ubforge.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int task_id;

    @Column(name = "task_title")
    private String task_title;

    @Column(name = "task_description")
    private String task_description;

    @Column(name = "task_status")
    private String taskStatus;

    @Column(name = "issue_id")
    private int issueId;

    @Column(name = "task_author")
    private int task_author;

    @ManyToOne
    @JoinColumn(name = "assign_to", referencedColumnName = "user_id")
    private User assignTo;

    @Column(name = "task_date_created")
    private Date task_date_created;

    @Column(name = "task_priority")
    private String task_priority;

    public String getTask_priority() {
        return task_priority;
    }

    public void setTask_priority(String task_priority) {
        this.task_priority = task_priority;
    }

    public Date getTask_date_created() {
        return task_date_created;
    }

    public void setTask_date_created(Date task_date_created) {
        this.task_date_created = task_date_created;
    }

    public int getIssue_id() {
        return issueId;
    }

    public void setIssue_id(int issueId) {
        this.issueId = issueId;
    }

    public int getTask_id() {
        return task_id;
    }

    public void setTask_id(int task_id) {
        this.task_id = task_id;
    }

    public String getTask_title() {
        return task_title;
    }

    public void setTask_title(String task_title) {
        this.task_title = task_title;
    }

    public String getTask_description() {
        return task_description;
    }

    public void setTask_description(String task_description) {
        this.task_description = task_description;
    }

    public String getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus;
    }

    public void setId(int id) {
        this.task_id = id;
    }

    public User getAssignTo() {
        return assignTo;
    }

    public void setAssignTo(User assignTo) {
        this.assignTo = assignTo;
    }

    public int getTask_author() {
        return task_author;
    }
}
