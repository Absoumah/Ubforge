package com.ubforge.ubforge.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ubforge.ubforge.repository.CommentRepository;
import com.ubforge.ubforge.model.Comment;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }
    
    public List<Comment> getCommentByTaskId(int taskId) {
        return commentRepository.findByEntityIdAndEntityType(taskId, "task");
    }

    public List<Comment> getCommentByIssueId(int issueId) {
        return commentRepository.findByEntityIdAndEntityType(issueId, "issue");
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }
    
}
