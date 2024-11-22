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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int task_id;

    @Column(name = "task_title")
    private String task_title;

    @Column(name = "task_description")
    private String task_description;

    @Column(name = "task_status")
    private String task_status;

    @ManyToOne
    private Issue issue;

    @ManyToOne
    private User task_autor;

    @ManyToOne
    @JoinColumn(name = "assign_to", referencedColumnName = "user_id")
    private User assignTo;

    @Column(name = "task_date_created")
    private Date task_date_created;

    @Column(name = "task_priority")
    private String task_priority;

    
    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    public User getTask_autor() {
        return task_autor;
    }

    public void setTask_autor(User task_autor) {
        this.task_autor = task_autor;
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

    public String getTask_status() {
        return task_status;
    }

    public void setTask_status(String task_status) {
        this.task_status = task_status;
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
}
