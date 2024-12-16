package com.ubforge.ubforge.controller;

import java.util.List;

import com.ubforge.ubforge.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ubforge.ubforge.service.CommentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;


    @Operation(summary = "Create a new comment")
    @ApiResponse(responseCode = "200", description = "Comment created")
    @ApiResponse(responseCode = "400", description = "Bad request")
    @PostMapping("/add")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.createComment(comment));
    }

    // get comment by task id response entity
    @GetMapping("/getByTaskId/{taskId}")
    public ResponseEntity<List<Comment>> getCommentByTaskId(@PathVariable int taskId) {
        return ResponseEntity.ok(commentService.getCommentByTaskId(taskId));
    }

    // get comment by issue id
    @GetMapping("/getByIssueId/{issueId}")
    public ResponseEntity<List<Comment>> getCommentByIssueId(@PathVariable int issueId) {
        return ResponseEntity.ok(commentService.getCommentByIssueId(issueId));
    }

    // get all comments
    @GetMapping("/getAll")
    public ResponseEntity<List<Comment>> getAllComments() {
        return ResponseEntity.ok(commentService.getAllComments());
    }

}
