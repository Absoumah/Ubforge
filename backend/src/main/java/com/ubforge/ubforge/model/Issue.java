package com.ubforge.ubforge.model;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;

@Entity
@Table(name = "issues")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int issue_id;

    @Column(name = "issue_title")
    private String issue_title;

    @Column(name = "issue_description")
    private String issue_description;

    @Column(name = "issue_status")
    private String issue_status;

    @Column(name = "issue_priority")
    private String issue_priority;

    @ManyToOne
    @JoinColumn(name = "issue_author", referencedColumnName = "user_id")    
    private User issue_author;

    // @ManyToMany
    // @JoinTable(name = "assignedIssues",
    //         joinColumns = @JoinColumn(name = "issue_id", referencedColumnName = "issue_id"),
    //         inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"))
    // private List<User> assignedTo;

    @Column(name = "project_id")    
    private int project_id;

    @Column(name = "issue_date_created")
    private Date issue_date_created;

    // @OneToMany(mappedBy = "issue")
    // private List<Task> tasks;

    public User getIssue_author() {
        return issue_author;
    }

    public String getIssue_description() {
        return issue_description;
    }

    public int getIssue_id() {
        return issue_id;
    }
    
    public String getIssue_priority() {
        return issue_priority;
    }

    public String getIssue_status() {
        return issue_status;
    }

    public String getIssue_title() {
        return issue_title;
    }

    public void setIssue_author(User issue_author) {
        this.issue_author = issue_author;
    }

    public void setIssue_description(String issue_description) {
        this.issue_description = issue_description;
    }

    public void setIssue_id(int issue_id) {
        this.issue_id = issue_id;
    }

    public void setIssue_priority(String issue_priority) {
        this.issue_priority = issue_priority;
    }

    public void setIssue_status(String issue_status) {
        this.issue_status = issue_status;
    }

    public void setIssue_title(String issue_title) {
        this.issue_title = issue_title;
    }

    public Date getIssue_date_created() {
        return issue_date_created;
    }

    public void setIssue_date_created(Date issue_date_created) {
        this.issue_date_created = issue_date_created;
    }

    public int getProject_id() {
        return project_id;
    }

    public void setProject_id(int project_id) {
        this.project_id = project_id;
    }
    
    

    
}
