package com.ubforge.ubforge.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.ubforge.ubforge.model.Teste;
import com.ubforge.ubforge.service.TestService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;

class TestControllerTest {

    @Mock
    private TestService testService;

    @InjectMocks
    private TestController testController;

    private Teste test;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialisation d'un objet Test pour les tests
        test = new Teste();
        test.setId(1);
        test.setTitle("Test Example");
        test.setStatus("Pending");
    }

    @Test
    void testCreateTest() {
        // Simulation de la création d'un test
        when(testService.createTest(any(Teste.class))).thenReturn(test);

        // Appel de la méthode du contrôleur
        ResponseEntity<Teste> response = testController.createTest(test);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que la réponse est OK
        assertNotNull(response.getBody());
        assertEquals(test, response.getBody()); // Vérifie que le test retourné est le bon
        verify(testService, times(1)).createTest(any(Teste.class)); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testGetAllTests() {
        // Simulation de la récupération de tous les tests
        when(testService.getAllTests()).thenReturn(Arrays.asList(test));

        // Appel de la méthode du contrôleur
        ResponseEntity<Iterable<Teste>> response = testController.getAllTests();

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(testService, times(1)).getAllTests(); // Vérifie que le service a été appelé une fois
    }

    @Test
    void testUpdateTestStatus() {
        // Simulation de la mise à jour du statut d'un test
        when(testService.updateTestStatus(eq(1), any(Teste.class))).thenReturn(test);

        // Appel de la méthode du contrôleur
        ResponseEntity<Teste> response = testController.updateTestStatus(1, test);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(test, response.getBody()); // Vérifie que le test retourné est le bon
        verify(testService, times(1)).updateTestStatus(eq(1), any(Teste.class)); // Vérifie que le service a été appelé une fois
    }
}
