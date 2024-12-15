package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Issue;
import com.ubforge.ubforge.service.IssueService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class IssueControllerTest {

    @Mock
    private IssueService issueService;

    @InjectMocks
    private IssueController issueController;

    private Issue issue;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un problème pour les tests
        issue = new Issue();
        issue.setId(1);
        issue.setTitle("Test Issue");
        issue.setDescription("This is a test issue");
    }

    @Test
    void testCreateIssue() {
        // Simuler la création d'un problème
        when(issueService.createIssue(any(Issue.class))).thenReturn(issue);

        // Appeler la méthode du contrôleur
        ResponseEntity<Issue> response = issueController.createIssue(issue);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(issue.getId(), response.getBody().getId()); // Vérifie que l'ID du problème est correct
        assertEquals(issue.getTitle(), response.getBody().getTitle()); // Vérifie que le titre est correct
        verify(issueService, times(1)).createIssue(any(Issue.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetAllIssues() {
        // Simuler la récupération de tous les problèmes
        when(issueService.getAllIssues()).thenReturn(Arrays.asList(issue));

        // Appeler la méthode du contrôleur
        ResponseEntity<Iterable<Issue>> response = issueController.getAllIssues();

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertTrue(response.getBody().iterator().hasNext()); // Vérifie qu'il y a des problèmes dans la liste
        verify(issueService, times(1)).getAllIssues(); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetIssueById() {
        // Simuler la récupération d'un problème par ID
        when(issueService.getIssueById(1)).thenReturn(issue);

        // Appeler la méthode du contrôleur
        ResponseEntity<Issue> response = issueController.getIssueById(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(issue.getId(), response.getBody().getId()); // Vérifie que l'ID du problème est correct
        assertEquals(issue.getTitle(), response.getBody().getTitle()); // Vérifie que le titre est correct
        verify(issueService, times(1)).getIssueById(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testUpdateIssue() {
        // Simuler la mise à jour d'un problème
        Issue updatedIssue = new Issue();
        updatedIssue.setId(1);
        updatedIssue.setTitle("Updated Issue");
        updatedIssue.setDescription("This is an updated test issue");

        when(issueService.updateIssue(eq(1), any(Issue.class))).thenReturn(updatedIssue);

        // Appeler la méthode du contrôleur
        ResponseEntity<Issue> response = issueController.updateIssue(1, updatedIssue);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(updatedIssue.getTitle(), response.getBody().getTitle()); // Vérifie que le titre est mis à jour
        assertEquals(updatedIssue.getDescription(), response.getBody().getDescription()); // Vérifie que la description est mise à jour
        verify(issueService, times(1)).updateIssue(eq(1), any(Issue.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testDeleteIssue() {
        // Simuler la suppression d'un problème
        doNothing().when(issueService).deleteIssue(1);

        // Appeler la méthode du contrôleur
        ResponseEntity<Void> response = issueController.deleteIssue(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        verify(issueService, times(1)).deleteIssue(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testAssignToUser() {
        // Simuler l'assignation d'un problème à un utilisateur
        doNothing().when(issueService).assignToUser(1, 1);

        // Appeler la méthode du contrôleur
        ResponseEntity<Void> response = issueController.assignToUser(1, 1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        verify(issueService, times(1)).assignToUser(1, 1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testFindIssueIdsByUserId() {
        // Simuler la récupération des IDs de problèmes assignés à un utilisateur
        Set<Integer> issueIds = new HashSet<>();
        issueIds.add(1);
        when(issueService.findIssueIdsByUserId(1)).thenReturn(issueIds);

        // Appeler la méthode du contrôleur
        ResponseEntity<Set<Integer>> response = issueController.findIssueIdsByUserId(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertTrue(response.getBody().contains(1)); // Vérifie que l'ID du problème est présent dans la liste
        verify(issueService, times(1)).findIssueIdsByUserId(1); // Vérifie que la méthode du service a été appelée
    }
}