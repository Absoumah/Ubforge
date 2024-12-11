package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.User;
import com.ubforge.ubforge.service.UserService;
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

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un objet User pour les tests
        user = new User();
        user.setId(1);
        user.setFirstName("testUser");
        user.setEmail("testuser@example.com");
    }

    @Test
    void testCreateUser() {
        // Simulation de la création d'un utilisateur
        when(userService.createUser(any(User.class))).thenReturn(user);

        // Appel de la méthode du contrôleur
        ResponseEntity<Void> response = userController.createUser(user);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que la réponse est OK
        verify(userService, times(1)).createUser(any(User.class)); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testGetUserById() {
        // Simulation de la récupération d'un utilisateur par ID
        when(userService.getUserById(1)).thenReturn(user);

        // Appel de la méthode du contrôleur
        ResponseEntity<User> response = userController.getUserById(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody()); // Vérifie que l'utilisateur retourné est celui attendu
        verify(userService, times(1)).getUserById(1); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testUpdateUser() {
        // Simulation de la mise à jour d'un utilisateur
        doNothing().when(userService).updateUser(eq(1), any(User.class));

        // Appel de la méthode du contrôleur
        ResponseEntity<Void> response = userController.updateUser(1, user);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(userService, times(1)).updateUser(eq(1), any(User.class)); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testDeleteUser() {
        // Simulation de la suppression d'un utilisateur
        doNothing().when(userService).deleteUser(1);

        // Appel de la méthode du contrôleur
        ResponseEntity<Void> response = userController.deleteUser(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(userService, times(1)).deleteUser(1); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testGetAllUsers() {
        // Simulation de la récupération de tous les utilisateurs
        when(userService.getAllUsers()).thenReturn(Arrays.asList(user));

        // Appel de la méthode du contrôleur
        ResponseEntity<Iterable<User>> response = userController.getAllUsers();

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(userService, times(1)).getAllUsers(); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testFindUserIdsByIssueId() {
        // Simulation de la récupération des utilisateurs assignés à un issue
        Set<Integer> userIds = new HashSet<>();
        userIds.add(1);
        userIds.add(2);
        when(userService.findUserIdsByIssueId(1)).thenReturn(userIds);

        // Appel de la méthode du contrôleur
        ResponseEntity<Set<Integer>> response = userController.findUserIdsByIssueId(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userIds, response.getBody()); // Vérifie que les IDs des utilisateurs retournés sont ceux attendus
        verify(userService, times(1)).findUserIdsByIssueId(1); // Vérifie que le service a été appelé une fois
    }
}
