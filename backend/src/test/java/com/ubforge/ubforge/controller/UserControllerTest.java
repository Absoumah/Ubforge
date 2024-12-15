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

        // Initialisation d'un utilisateur pour les tests
        user = new User();
        user.setId(1);
        user.setFirstName("Test User");
    }

    @Test
    void testCreateUser() {
        // Simuler la création d'un utilisateur
        when(userService.createUser(any(User.class))).thenReturn(user);

        // Appeler la méthode du contrôleur
        ResponseEntity<Void> response = userController.createUser(user);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        verify(userService, times(1)).createUser(any(User.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetUserById() {
        // Simuler la récupération d'un utilisateur par ID
        when(userService.getUserById(1)).thenReturn(user);

        // Appeler la méthode du contrôleur
        ResponseEntity<User> response = userController.getUserById(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(user.getId(), response.getBody().getId()); // Vérifie que l'ID de l'utilisateur est correct
        verify(userService, times(1)).getUserById(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testUpdateUser() {
        // Simuler la mise à jour d'un utilisateur
        doNothing().when(userService).updateUser(eq(1), any(User.class));

        // Appeler la méthode du contrôleur
        ResponseEntity<Void> response = userController.updateUser(1, user);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        verify(userService, times(1)).updateUser(eq(1), any(User.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testDeleteUser() {
        // Simuler la suppression d'un utilisateur
        doNothing().when(userService).deleteUser(1);

        // Appeler la méthode du contrôleur
        ResponseEntity<Void> response = userController.deleteUser(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        verify(userService, times(1)).deleteUser(1); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetAllUsers() {
        // Simuler la récupération de tous les utilisateurs
        when(userService.getAllUsers()).thenReturn(Arrays.asList(user));

        // Appeler la méthode du contrôleur
        ResponseEntity<Iterable<User>> response = userController.getAllUsers();

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertTrue(response.getBody().iterator().hasNext()); // Vérifie qu'il y a des utilisateurs dans la liste
        verify(userService, times(1)).getAllUsers(); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testFindUserIdsByIssueId() {
        // Simuler la récupération des utilisateurs assignés à un problème (issueId)
        Set<Integer> userIds = new HashSet<>(Arrays.asList(1, 2, 3));
        when(userService.findUserIdsByIssueId(1)).thenReturn(userIds);

        // Appeler la méthode du contrôleur
        ResponseEntity<Set<Integer>> response = userController.findUserIdsByIssueId(1);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(userIds, response.getBody()); // Vérifie que les IDs des utilisateurs sont corrects
        verify(userService, times(1)).findUserIdsByIssueId(1); // Vérifie que la méthode du service a été appelée
    }
}