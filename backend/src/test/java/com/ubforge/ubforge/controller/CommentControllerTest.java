package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Comment;
import com.ubforge.ubforge.service.CommentService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

class CommentControllerTest {

    @Mock
    private CommentService commentService;

    @InjectMocks
    private CommentController commentController;

    private Comment comment;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un commentaire pour les tests
        comment = new Comment();
        comment.setId(1);
        comment.setContent("Test comment");
    }

    @Test
    void testCreateComment() {
        // Simuler la création d'un commentaire
        when(commentService.createComment(any(Comment.class))).thenReturn(comment);

        // Appeler la méthode du contrôleur
        ResponseEntity<Void> response = commentController.createComment(comment);

        // Vérifications
        assertEquals(HttpStatus.CREATED, response.getStatusCode()); // Vérifie que le statut est 201
        assertTrue(response.getHeaders().getLocation().toString().contains("/comment/1")); // Vérifie l'URL retournée
        verify(commentService, times(1)).createComment(any(Comment.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetCommentByTaskId() {
        // Simuler la liste des commentaires pour un taskId
        List<Comment> comments = Arrays.asList(comment);
        when(commentService.getCommentByTaskId(1)).thenReturn(comments);

        // Appeler la méthode du contrôleur
        ResponseEntity<List<Comment>> response = commentController.getCommentByTaskId(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(1, response.getBody().size()); // Vérifie qu'il y a un commentaire dans la liste
        verify(commentService, times(1)).getCommentByTaskId(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetCommentByIssueId() {
        // Simuler la liste des commentaires pour un issueId
        List<Comment> comments = Arrays.asList(comment);
        when(commentService.getCommentByIssueId(1)).thenReturn(comments);

        // Appeler la méthode du contrôleur
        ResponseEntity<List<Comment>> response = commentController.getCommentByIssueId(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(1, response.getBody().size()); // Vérifie qu'il y a un commentaire dans la liste
        verify(commentService, times(1)).getCommentByIssueId(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetAllComments() {
        // Simuler la liste de tous les commentaires
        List<Comment> comments = Arrays.asList(comment);
        when(commentService.getAllComments()).thenReturn(comments);

        // Appeler la méthode du contrôleur
        ResponseEntity<List<Comment>> response = commentController.getAllComments();

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(1, response.getBody().size()); // Vérifie qu'il y a un commentaire dans la liste
        verify(commentService, times(1)).getAllComments(); // Vérifie que la méthode du service a été appelée
    }
}
