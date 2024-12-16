
package com.ubforge.ubforge.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.User;
import com.ubforge.ubforge.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;
import java.util.Set;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un utilisateur pour les tests
        user = new User();
        user.setId(1);
        user.setFirstName("John Doe");
        user.setEmail("johndoe@example.com");
    }

    @Test
    void testCreateUser() {
        // Simuler la création d'un utilisateur
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Appeler la méthode createUser
        User createdUser = userService.createUser(user);

        // Vérifications
        assertNotNull(createdUser); // Vérifie que l'utilisateur créé n'est pas nul
        assertEquals(user.getId(), createdUser.getId()); // Vérifie que l'ID de l'utilisateur est correct
        assertEquals(user.getFirstName(), createdUser.getFirstName()); // Vérifie que le nom de l'utilisateur est correct
        assertEquals(user.getEmail(), createdUser.getEmail()); // Vérifie que l'email de l'utilisateur est correct
        verify(userRepository, times(1)).save(any(User.class)); // Vérifie que save a été appelé une fois
    }

    @Test
    void testGetUserById() {
        // Simuler la récupération d'un utilisateur par ID
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        // Appeler la méthode getUserById
        User foundUser = userService.getUserById(1);

        // Vérifications
        assertNotNull(foundUser); // Vérifie que l'utilisateur trouvé n'est pas nul
        assertEquals(user.getId(), foundUser.getId()); // Vérifie que l'ID de l'utilisateur est correct
        assertEquals(user.getFirstName(), foundUser.getFirstName()); // Vérifie que le nom de l'utilisateur est correct
        verify(userRepository, times(1)).findById(1); // Vérifie que findById a été appelé une fois
    }

    @Test
    void testUpdateUser() {
        // Simuler le cas où l'utilisateur existe
        when(userRepository.existsById(1)).thenReturn(true);
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Mettre à jour l'utilisateur
        user.setFirstName("Updated Name");
        userService.updateUser(1, user);

        // Vérifications
        assertEquals("Updated Name", user.getFirstName()); // Vérifie que le nom de l'utilisateur a été mis à jour
        verify(userRepository, times(1)).save(any(User.class)); // Vérifie que save a été appelé une fois
    }

    @Test
    void testUpdateUserNotFound() {
        // Simuler le cas où l'utilisateur n'existe pas
        when(userRepository.existsById(1)).thenReturn(false);

        // Appeler la méthode updateUser
        userService.updateUser(1, user);

        // Vérifications
        verify(userRepository, times(0)).save(any(User.class)); // Vérifie que save n'a pas été appelé
    }

    @Test
    void testDeleteUser() {
        // Simuler la suppression de l'utilisateur
        doNothing().when(userRepository).deleteById(1);

        // Appeler la méthode deleteUser
        userService.deleteUser(1);

        // Vérifications
        verify(userRepository, times(1)).deleteById(1); // Vérifie que deleteById a été appelé une fois
    }

    @Test
    void testGetAllUsers() {
        // Simuler la récupération de tous les utilisateurs
        Iterable<User> users = List.of(user);
        when(userRepository.findAll()).thenReturn((List<User>) users);

        // Appeler la méthode getAllUsers
        Iterable<User> allUsers = userService.getAllUsers();

        // Vérifications
        assertNotNull(allUsers); // Vérifie que la liste des utilisateurs n'est pas nulle
        assertTrue(allUsers.iterator().hasNext()); // Vérifie que la liste contient des éléments
        verify(userRepository, times(1)).findAll(); // Vérifie que findAll a été appelé une fois
    }

    @Test
    void testFindUserIdsByIssueId() {
        // Simuler la recherche des utilisateurs par issueId
        Set<Integer> userIds = Set.of(1, 2, 3);
        when(userRepository.findUserIdsByIssueId(1)).thenReturn(userIds);

        // Appeler la méthode findUserIdsByIssueId
        Set<Integer> result = userService.findUserIdsByIssueId(1);

        // Vérifications
        assertNotNull(result); // Vérifie que le résultat n'est pas nul
        assertTrue(result.contains(1)); // Vérifie que l'ID 1 est présent dans les résultats
        verify(userRepository, times(1)).findUserIdsByIssueId(1); // Vérifie que findUserIdsByIssueId a été appelé une fois
    }
}
