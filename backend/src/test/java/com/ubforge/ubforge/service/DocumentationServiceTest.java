package com.ubforge.ubforge.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.DocumentCategory;
import com.ubforge.ubforge.model.DocumentStatus;
import com.ubforge.ubforge.model.Documentation;
import com.ubforge.ubforge.repository.DocumentationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

class DocumentationServiceTest {

    @Mock
    private DocumentationRepository documentationRepository;

    @InjectMocks
    private DocumentationService documentationService;

    private Documentation documentation;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un objet Documentation pour les tests
        documentation = new Documentation();
        documentation.setId(1);
        documentation.setTitle("Test Documentation");
        documentation.setContent("This is a test content.");
        documentation.setCategory(DocumentCategory.GENERAL);
        documentation.setStatus(DocumentStatus.PUBLISHED);
        documentation.setVersion("1.0");
        documentation.setCreatedAt(new Date());
        documentation.setUpdatedAt(new Date());
    }

    @Test
    void testCreateDocumentation() {
        // Simuler la création de documentation
        when(documentationRepository.save(any(Documentation.class))).thenReturn(documentation);

        // Appeler la méthode du service
        Documentation response = documentationService.createDocumentation(documentation);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(documentation.getId(), response.getId()); // Vérifie l'ID de la documentation
        assertEquals(documentation.getTitle(), response.getTitle()); // Vérifie le titre
        assertNotNull(response.getCreatedAt()); // Vérifie que la date de création est définie
        verify(documentationRepository, times(1)).save(any(Documentation.class)); // Vérifie que la méthode save a été appelée
    }

    @Test
    void testGetDocumentationsByProjectId() {
        // Simuler la récupération de documentations par projectId
        when(documentationRepository.findByProjectId(1)).thenReturn(Arrays.asList(documentation));

        // Appeler la méthode du service
        List<Documentation> response = documentationService.getDocumentationsByProjectId(1);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'une seule documentation est retournée
        assertEquals(documentation.getId(), response.get(0).getId()); // Vérifie l'ID de la documentation
        verify(documentationRepository, times(1)).findByProjectId(1); // Vérifie que la méthode findByProjectId a été appelée
    }

    @Test
    void testGetDocumentationById() {
        // Simuler la récupération d'une documentation par ID
        when(documentationRepository.findById(1)).thenReturn(Optional.of(documentation));

        // Appeler la méthode du service
        Documentation response = documentationService.getDocumentationById(1);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(documentation.getId(), response.getId()); // Vérifie l'ID de la documentation
        verify(documentationRepository, times(1)).findById(1); // Vérifie que la méthode findById a été appelée
    }

    @Test
    void testUpdateDocumentation() {
        // Simuler la récupération de documentation existante
        when(documentationRepository.findById(1)).thenReturn(Optional.of(documentation));
        when(documentationRepository.save(any(Documentation.class))).thenReturn(documentation);

        // Préparer la documentation mise à jour
        documentation.setTitle("Updated Documentation");

        // Appeler la méthode du service
        Documentation response = documentationService.updateDocumentation(1, documentation);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals("Updated Documentation", response.getTitle()); // Vérifie le titre mis à jour
        assertNotNull(response.getUpdatedAt()); // Vérifie que la date de mise à jour est définie
        verify(documentationRepository, times(1)).findById(1); // Vérifie que la méthode findById a été appelée
        verify(documentationRepository, times(1)).save(any(Documentation.class)); // Vérifie que la méthode save a été appelée
    }

    @Test
    void testDeleteDocumentation() {
        // Simuler la suppression de documentation
        doNothing().when(documentationRepository).deleteById(1);

        // Appeler la méthode du service
        documentationService.deleteDocumentation(1);

        // Vérifications
        verify(documentationRepository, times(1)).deleteById(1); // Vérifie que la méthode deleteById a été appelée
    }

    @Test
    void testUpdateDocumentationNotFound() {
        // Simuler le cas où la documentation n'est pas trouvée
        when(documentationRepository.findById(1)).thenReturn(Optional.empty());

        // Vérifier que la méthode lève une exception
        Exception exception = assertThrows(RuntimeException.class, () -> {
            documentationService.updateDocumentation(1, documentation);
        });

        // Vérifications
        assertEquals("Documentation not found", exception.getMessage());
    }
}
