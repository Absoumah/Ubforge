package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Documentation;
import com.ubforge.ubforge.service.DocumentationService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

class DocumentationControllerTest {

    @Mock
    private DocumentationService documentationService;

    @InjectMocks
    private DocumentationController documentationController;

    private Documentation documentation;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un objet Documentation pour les tests
        documentation = new Documentation();
        documentation.setId(1);
        documentation.setTitle("Test Documentation");
        documentation.setContent("Test content");
    }

    @Test
    void testCreateDocumentation() {
        // Simulation de la création d'une documentation
        when(documentationService.createDocumentation(any(Documentation.class))).thenReturn(documentation);

        // Appel de la méthode du contrôleur
        ResponseEntity<Documentation> response = documentationController.createDocumentation(documentation);

        // Vérifications
        assertEquals(HttpStatus.CREATED, response.getStatusCode()); // Vérifie que le statut est 201
        assertNotNull(response.getBody()); // Vérifie que le corps de la réponse contient un objet
        assertEquals("Test Documentation", response.getBody().getTitle()); // Vérifie que le titre est correct
        verify(documentationService, times(1)).createDocumentation(any(Documentation.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetDocumentationsByProjectId() {
        // Simulation de la récupération des documentations pour un projectId donné
        List<Documentation> documentationsList = Arrays.asList(documentation);
        when(documentationService.getDocumentationsByProjectId(1)).thenReturn(documentationsList);

        // Appel de la méthode du contrôleur
        ResponseEntity<List<Documentation>> response = documentationController.getDocumentationsByProjectId(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(1, response.getBody().size()); // Vérifie qu'il y a un seul élément dans la liste
        assertEquals("Test Documentation", response.getBody().get(0).getTitle()); // Vérifie que le titre est correct
        verify(documentationService, times(1)).getDocumentationsByProjectId(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testUpdateDocumentationProjectId() {
        // Simulation de la mise à jour d'une documentation
        documentation.setTitle("Updated Documentation");
        when(documentationService.updateDocumentationProjectId(1, documentation)).thenReturn(documentation);

        // Appel de la méthode du contrôleur
        ResponseEntity<Documentation> response = documentationController.updateDocumentationProjectId(1, documentation);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals("Updated Documentation", response.getBody().getTitle()); // Vérifie que le titre est mis à jour
        verify(documentationService, times(1)).updateDocumentationProjectId(1, documentation); // Vérifie que la méthode du service a été appelée
    }
}
