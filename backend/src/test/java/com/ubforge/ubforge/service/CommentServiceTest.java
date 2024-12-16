package com.ubforge.ubforge.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Comment;
import com.ubforge.ubforge.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private CommentService commentService;

    private Comment comment;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un commentaire pour les tests
        comment = new Comment();
        comment.setId(1);
        comment.setContent("This is a test comment");
        comment.setEntityId(1); // Id de l'entité (task/issue)
        comment.setEntityType("task"); // Type d'entité (task ou issue)
    }

    @Test
    void testCreateComment() {
        // Simuler la sauvegarde d'un commentaire
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);

        // Appeler la méthode du service
        Comment response = commentService.createComment(comment);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(comment.getId(), response.getId()); // Vérifie l'ID du commentaire
        assertEquals(comment.getContent(), response.getContent()); // Vérifie le contenu du commentaire
        verify(commentRepository, times(1)).save(any(Comment.class)); // Vérifie que la méthode du repository a été appelée
    }

    @Test
    void testGetCommentByTaskId() {
        // Simuler la récupération des commentaires par ID de tâche
        List<Comment> comments = Arrays.asList(comment);
        when(commentRepository.findByEntityIdAndEntityType(1, "task")).thenReturn(comments);

        // Appeler la méthode du service
        List<Comment> response = commentService.getCommentByTaskId(1);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'il y a un commentaire dans la réponse
        assertEquals(comment.getId(), response.get(0).getId()); // Vérifie l'ID du commentaire
        verify(commentRepository, times(1)).findByEntityIdAndEntityType(1, "task"); // Vérifie que la méthode du repository a été appelée
    }

    @Test
    void testGetCommentByIssueId() {
        // Simuler la récupération des commentaires par ID de problème
        List<Comment> comments = Arrays.asList(comment);
        when(commentRepository.findByEntityIdAndEntityType(1, "issue")).thenReturn(comments);

        // Appeler la méthode du service
        List<Comment> response = commentService.getCommentByIssueId(1);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'il y a un commentaire dans la réponse
        assertEquals(comment.getId(), response.get(0).getId()); // Vérifie l'ID du commentaire
        verify(commentRepository, times(1)).findByEntityIdAndEntityType(1, "issue"); // Vérifie que la méthode du repository a été appelée
    }

    @Test
    void testGetAllComments() {
        // Simuler la récupération de tous les commentaires
        List<Comment> comments = Arrays.asList(comment);
        when(commentRepository.findAll()).thenReturn(comments);

        // Appeler la méthode du service
        List<Comment> response = commentService.getAllComments();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'il y a un commentaire dans la réponse
        assertEquals(comment.getId(), response.get(0).getId()); // Vérifie l'ID du commentaire
        verify(commentRepository, times(1)).findAll(); // Vérifie que la méthode du repository a été appelée
    }
}
