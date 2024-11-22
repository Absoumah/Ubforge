package com.ubforge.ubforge.model;


import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int project_id;

    @Column(name = "project_title")
    private String project__title;

    @Column(name = "project_description")
    private String project_description;

    @Column(name = "project_status")
    private String project_status;

    @Column(name = "project_date_created")
    private Date project_date_created;

    public String getDescription() {
        return project_description;
    }

    public void setDescription(String description) {
        this.project__title = description;
    }

    public int getId() {
        return project_id;
    }

    public String getTitle() {
        return project__title;
    }

    public void setTitle(String title) {
        this.project__title = title;
    }

    public void setId(int id) {
        this.project_id = id;
    }



}
