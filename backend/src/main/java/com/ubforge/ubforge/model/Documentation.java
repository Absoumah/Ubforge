package com.ubforge.ubforge.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "documentations")
public class Documentation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @Column(name = "documentation_title")
    private String title;

    @Column(name = "documentation_content")
    private String content;

    @Column(name = "project_id")
    private Integer projectId;

    public String getContent() {
        return content;
    }

    public int getId() {
        return id;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public String getTitle() {
        return title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    
}
