package com.ubforge.ubforge.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "releases")
public class Release {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "release_name")
    private String name;

    @Column(name = "release_version")
    private int version;

    @Column(name = "release_date")
    private Date createdAt;

    @Column(name = "release_description")
    private String description;

    @Column(name = "release_status")
    private String status;

    @Column(name = "release_author")
    private int authorId;

    public int getVersion() {
        return version;
    }

    public String getDescription() {
        return description;
    }

    public void setVersion(int version) {
        this.version = version;
    }


    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public String getStatus() {
        return status;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
}
