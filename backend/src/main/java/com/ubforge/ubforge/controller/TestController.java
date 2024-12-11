package com.ubforge.ubforge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ubforge.ubforge.model.Teste;
import com.ubforge.ubforge.service.TestService;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TestService testService;

    //create a new test with request entity
    @PostMapping("/create")
    public ResponseEntity<Teste> createTest(@RequestBody Teste test) {
        return ResponseEntity.ok(testService.createTest(test));
    }    

    //get all tests
    @GetMapping("/getAll")
    public ResponseEntity<Iterable<Teste>> getAllTests() {
        return ResponseEntity.ok(testService.getAllTests());
    }

    //update test status by id
    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<Teste> updateTestStatus(@PathVariable int id, @RequestBody Teste test) {
        return ResponseEntity.ok(testService.updateTestStatus(id,test));
    }

    
}
