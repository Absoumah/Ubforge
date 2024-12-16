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

        // Initialisation d'une instance de Documentation pour les tests
        documentation = new Documentation();
        documentation.setId(1);
        documentation.setTitle("Test Documentation");
        documentation.setContent("This is a test documentation content");
    }

    @Test
    void testCreateDocumentation() {
        // Simuler la création de documentation
        when(documentationService.createDocumentation(any(Documentation.class))).thenReturn(documentation);

        // Appeler la méthode du contrôleur
        ResponseEntity<Documentation> response = documentationController.createDocumentation(documentation);

        // Vérifications
        assertEquals(HttpStatus.CREATED, response.getStatusCode()); // Vérifie que le statut est 201
        assertNotNull(response.getBody()); // Vérifie que le corps de la réponse n'est pas nul
        assertEquals(documentation.getTitle(), response.getBody().getTitle()); // Vérifie que le titre de la documentation est correct
        verify(documentationService, times(1)).createDocumentation(any(Documentation.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetDocumentationsByProjectId() {
        // Simuler une liste de documentations pour un projectId
        List<Documentation> documentationsList = Arrays.asList(documentation);
        when(documentationService.getDocumentationsByProjectId(1)).thenReturn(documentationsList);

        // Appeler la méthode du contrôleur
        ResponseEntity<List<Documentation>> response = documentationController.getDocumentationsByProject(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(1, response.getBody().size()); // Vérifie qu'il y a une documentation dans la liste
        assertEquals(documentation.getTitle(), response.getBody().get(0).getTitle()); // Vérifie que le titre de la documentation est correct
        verify(documentationService, times(1)).getDocumentationsByProjectId(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testUpdateDocumentationProjectId() {
        // Simuler la mise à jour de documentation
        Documentation updatedDocumentation = new Documentation();
        updatedDocumentation.setId(1);
        updatedDocumentation.setTitle("Updated Documentation");
        updatedDocumentation.setContent("This is updated content");

        when(documentationService.updateDocumentation(eq(1), any(Documentation.class))).thenReturn(updatedDocumentation);

        // Appeler la méthode du contrôleur
        ResponseEntity<Documentation> response = documentationController.updateDocumentation(1, updatedDocumentation);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(updatedDocumentation.getTitle(), response.getBody().getTitle()); // Vérifie que le titre est mis à jour
        assertEquals(updatedDocumentation.getContent(), response.getBody().getContent()); // Vérifie que le contenu est mis à jour
        verify(documentationService, times(1)).updateDocumentation(eq(1), any(Documentation.class)); // Vérifie que la méthode du service a été appelée
    }
}