
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
import java.util.List;

class TestControllerTest {

    @Mock
    private TestService testService;

    @InjectMocks
    private TestController testController;

    private Teste test;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Initialisation d'un test pour les tests
        test = new Teste();
        test.setId(1);
        test.setTitle("Sample Test");
        test.setStatus("Pending");
    }

    @Test
    void testCreateTest() {
        // Simuler la création d'un test
        when(testService.createTest(any(Teste.class))).thenReturn(test);

        // Appeler la méthode du contrôleur
        ResponseEntity<Teste> response = testController.createTest(test);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals(test.getId(), response.getBody().getId()); // Vérifie que l'ID du test est correct
        verify(testService, times(1)).createTest(any(Teste.class)); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testGetAllTests() {
        // Simuler la récupération de tous les tests
        List<Teste> testList = Arrays.asList(test);
        when(testService.getAllTests()).thenReturn(testList);

        // Appeler la méthode du contrôleur
        ResponseEntity<Iterable<Teste>> response = testController.getAllTests();

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertTrue(response.getBody().iterator().hasNext()); // Vérifie qu'il y a des tests dans la liste
        verify(testService, times(1)).getAllTests(); // Vérifie que la méthode du service a été appelée
    }

    @Test
    void testUpdateTestStatus() {
        // Simuler la mise à jour du statut d'un test
        test.setStatus("Completed");
        when(testService.updateTestStatus(eq(1), any(Teste.class))).thenReturn(test);

        // Appeler la méthode du contrôleur
        ResponseEntity<Teste> response = testController.updateTestStatus(1, test);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Vérifie que le statut est 200
        assertEquals("Completed", response.getBody().getStatus()); // Vérifie que le statut du test a été mis à jour
        verify(testService, times(1)).updateTestStatus(eq(1), any(Teste.class)); // Vérifie que la méthode du service a été appelée
    }
}
