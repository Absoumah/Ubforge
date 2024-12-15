package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
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

        // Initialisation d'un objet Issue pour les tests
        issue = new Issue();
        issue.setIssue_id(1);
        issue.setIssue_title("Test Issue");
        issue.setIssue_description("Test Description");
    }

    @Test
    void testCreateIssue() {
        // Simulation de la création d'un issue
        when(issueService.createIssue(any(Issue.class))).thenReturn(issue);

        // Appel de la méthode du contrôleur
        ResponseEntity<Void> response = issueController.createIssue(issue);

        // Vérifications
        assertEquals(HttpStatus.CREATED, response.getStatusCode()); // Vérifie que le statut est 201
        assertTrue(response.getHeaders().getLocation().toString().contains("/issue/1")); // Vérifie que l'URI est correct
        verify(issueService, times(1)).createIssue(any(Issue.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetAllIssues() {
        // Simulation de la récupération de toutes les issues
        when(issueService.getAllIssues()).thenReturn(Arrays.asList(issue));

        // Appel de la méthode du contrôleur
        ResponseEntity<Iterable<Issue>> response = issueController.getAllIssues();

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertTrue(response.getBody() instanceof Iterable); // Vérifie que le corps de la réponse est une liste
        assertEquals(1, ((Iterable<?>) response.getBody()).spliterator().getExactSizeIfKnown()); // Vérifie qu'il y a un seul élément
        verify(issueService, times(1)).getAllIssues(); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetIssueById() {
        // Simulation de la récupération d'un issue par ID
        when(issueService.getIssueById(1)).thenReturn(issue);

        // Appel de la méthode du contrôleur
        ResponseEntity<Issue> response = issueController.getIssueById(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(issue, response.getBody()); // Vérifie que le corps de la réponse correspond à l'issue récupéré
        verify(issueService, times(1)).getIssueById(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testUpdateIssue() {
        // Simulation de la mise à jour d'un issue
        issue.setIssue_title("Updated Issue");
        when(issueService.updateIssue(1, issue)).thenReturn(issue);

        // Appel de la méthode du contrôleur
        ResponseEntity<Issue> response = issueController.updateIssue(1, issue);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals("Updated Issue", response.getBody().getIssue_title()); // Vérifie que le titre de l'issue a été mis à jour
        verify(issueService, times(1)).updateIssue(1, issue); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testDeleteIssue() {
        // Simulation de la suppression d'un issue
        doNothing().when(issueService).deleteIssue(1);

        // Appel de la méthode du contrôleur
        ResponseEntity<Void> response = issueController.deleteIssue(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        verify(issueService, times(1)).deleteIssue(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testAssignToUser() {
        // Simulation de l'assignation d'un issue à un utilisateur
        doNothing().when(issueService).assignToUser(1, 1);

        // Appel de la méthode du contrôleur
        ResponseEntity<Void> response = issueController.assignToUser(1, 1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        verify(issueService, times(1)).assignToUser(1, 1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testAddToRelease() {
        // Simulation de l'ajout d'un issue à un release
        when(issueService.addToRelease(1, 1)).thenReturn(issue);

        // Appel de la méthode du contrôleur
        ResponseEntity<Issue> response = issueController.addToRelease(1, 1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(issue, response.getBody()); // Vérifie que l'issue retourné est le bon
        verify(issueService, times(1)).addToRelease(1, 1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testFindIssueIdsByUserId() {
        // Simulation de la récupération des issue_ids assignés à un utilisateur
        Set<Integer> issueIds = new HashSet<>(Arrays.asList(1, 2, 3));
        when(issueService.findIssueIdsByUserId(1)).thenReturn(issueIds);

        // Appel de la méthode du contrôleur
        ResponseEntity<Set<Integer>> response = issueController.findIssueIdsByUserId(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(issueIds, response.getBody()); // Vérifie que les IDs retournés correspondent à ceux attendus
        verify(issueService, times(1)).findIssueIdsByUserId(1); // Vérifie que la méthode du service a été appelée
    }
}
