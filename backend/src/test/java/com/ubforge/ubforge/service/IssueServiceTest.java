package com.ubforge.ubforge.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Issue;
import com.ubforge.ubforge.model.IssuePriority;
import com.ubforge.ubforge.model.User;
import com.ubforge.ubforge.repository.IssueRepository;
import com.ubforge.ubforge.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;
import java.util.Set;

class IssueServiceTest {

    @Mock
    private IssueRepository issueRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private IssueService issueService;

    private Issue issue;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un objet Issue pour les tests
        issue = new Issue();
        issue.setId(1);
        issue.setTitle("Test Issue");
        issue.setDescription("This is a test issue.");
        issue.setPriority(IssuePriority.HIGH);
        // Add other necessary properties for your Issue model
    }

    @Test
    void testCreateIssue() {
        // Simuler la sauvegarde d'une issue
        when(issueRepository.save(any(Issue.class))).thenReturn(issue);

        // Appeler la méthode du service
        Issue response = issueService.createIssue(issue);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(issue.getId(), response.getId()); // Vérifie l'ID de l'issue
        assertEquals(issue.getTitle(), response.getTitle()); // Vérifie le titre
        verify(issueRepository, times(1)).save(any(Issue.class)); // Vérifie que la méthode save a été appelée
    }

    @Test
    void testGetAllIssues() {
        // Simuler la récupération de toutes les issues
        when(issueRepository.findAll()).thenReturn(Arrays.asList(issue));

        // Appeler la méthode du service
        var response = issueService.getAllIssues();

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(1, response.size()); // Vérifie qu'une seule issue est retournée
        assertEquals(issue.getId(), response.get(0).getId()); // Vérifie l'ID de l'issue
        verify(issueRepository, times(1)).findAll(); // Vérifie que la méthode findAll a été appelée
    }

    @Test
    void testUpdateIssue() {
        // Simuler la récupération d'une issue par son ID
        when(issueRepository.existsById(1)).thenReturn(true);
        when(issueRepository.save(any(Issue.class))).thenReturn(issue);

        // Appeler la méthode du service
        Issue response = issueService.updateIssue(1, issue);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(issue.getId(), response.getId()); // Vérifie l'ID de l'issue
        assertEquals(issue.getTitle(), response.getTitle()); // Vérifie le titre
        verify(issueRepository, times(1)).save(any(Issue.class)); // Vérifie que la méthode save a été appelée
    }

    @Test
    void testUpdateIssueNotFound() {
        // Simuler le cas où l'issue n'existe pas
        when(issueRepository.existsById(1)).thenReturn(false);

        // Appeler la méthode du service
        Issue response = issueService.updateIssue(1, issue);

        // Vérifications
        assertNull(response); // Si l'issue n'est pas trouvée, la réponse doit être nulle
        verify(issueRepository, times(1)).existsById(1); // Vérifie que la méthode existsById a été appelée
    }

    @Test
    void testDeleteIssue() {
        // Simuler la suppression d'une issue
        doNothing().when(issueRepository).deleteById(1);

        // Appeler la méthode du service
        issueService.deleteIssue(1);

        // Vérifications
        verify(issueRepository, times(1)).deleteById(1); // Vérifie que la méthode deleteById a été appelée
    }

    @Test
    void testGetIssueById() {
        // Simuler la récupération d'une issue par ID
        when(issueRepository.findById(1)).thenReturn(Optional.of(issue));

        // Appeler la méthode du service
        Issue response = issueService.getIssueById(1);

        // Vérifications
        assertNotNull(response); // Vérifie que la réponse n'est pas nulle
        assertEquals(issue.getId(), response.getId()); // Vérifie l'ID de l'issue
        verify(issueRepository, times(1)).findById(1); // Vérifie que la méthode findById a été appelée
    }

    @Test
    void testAssignToUser() {
        // Simuler la recherche de l'issue et de l'utilisateur
        when(issueRepository.findById(1)).thenReturn(Optional.of(issue));
        when(userRepository.findById(1)).thenReturn(Optional.of(new User())); // Simuler un utilisateur existant

        // Appeler la méthode du service
        issueService.assignToUser(1, 1);

        // Vérifications
        verify(issueRepository, times(1)).assignToUser(1, 1); // Vérifie que la méthode assignToUser a été appelée
    }

    @Test
    void testAssignToUserNotFound() {
        // Simuler le cas où l'issue n'est pas trouvée
        when(issueRepository.findById(1)).thenReturn(Optional.empty());

        // Vérifier que l'exception est levée
        Exception exception = assertThrows(RuntimeException.class, () -> {
            issueService.assignToUser(1, 1);
        });

        // Vérification
        assertEquals("Issue not found", exception.getMessage());
    }

    @Test
    void testFindIssueIdsByUserId() {
        // Simuler la récupération des issueIds par userId
        when(issueRepository.findIssueIdsByUserId(1)).thenReturn(Set.of(1, 2));

        // Appeler la méthode du service
        Set<Integer> issueIds = issueService.findIssueIdsByUserId(1);

        // Vérifications
        assertNotNull(issueIds); // Vérifie que le résultat n'est pas nul
        assertEquals(2, issueIds.size()); // Vérifie que la taille est correcte
        assertTrue(issueIds.contains(1)); // Vérifie que l'issueId 1 est présent
        verify(issueRepository, times(1)).findIssueIdsByUserId(1); // Vérifie que la méthode a été appelée
    }
}
