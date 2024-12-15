package com.ubforge.ubforge.model;

import java.util.Date;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "releases")
public class Release {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "release_version")
    private String version;

    @Column(name = "release_name")
    private String name;

    @Column(name = "release_description")
    private String description;

    @Column(name = "release_date")
    private Date releaseDate;

    @Column(name = "release_status")
    private String status;

    @Column(name = "project_id")
    private int projectId;

    @ElementCollection
    @CollectionTable(name = "release_sprints", joinColumns = @JoinColumn(name = "release_id"))
    @Column(name = "sprint_id")
    private List<Integer> sprintIds;

    // Getters and Setters

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getVersion() {
        return version;
    }
    public void setVersion(String version) {
        this.version = version;
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

    public Date getReleaseDate() {
        return releaseDate;
    }
    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public int getProjectId() {
        return projectId;
    }
    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public List<Integer> getSprintIds() {
        return sprintIds;
    }
    public void setSprintIds(List<Integer> sprintIds) {
        this.sprintIds = sprintIds;
    }

}