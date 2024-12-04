package com.ubforge.ubforge.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "comment_content")
    private String content;

    @Column(name = "entity_id")
    private int entityId;

    @Column(name = "comment_date_created")
    private Date createdAt;

    @Column(name = "comment_author")
    private int commentAuthorId;

    @Column(name = "entity_type")
    private String entityType;

    public int getCommentAuthorId() {
        return commentAuthorId;
    }

    public String getContent() {
        return content;
    }

    public int getEntityId() {
        return entityId;
    }

    public String getEntityType() {
        return entityType;
    }

    public int getId() {
        return id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCommentAuthorId(int commentAuthorId) {
        this.commentAuthorId = commentAuthorId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setEntityId(int entityId) {
        this.entityId = entityId;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
