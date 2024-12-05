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
import com.ubforge.ubforge.model.Test;
import com.ubforge.ubforge.service.TestService;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TestService testService;

    //create a new test with request entity
    @PostMapping("/create")
    public ResponseEntity<Test> createTest(@RequestBody Test test) {
        return ResponseEntity.ok(testService.createTest(test));
    }    

    //get all tests
    @GetMapping("/getAll")
    public ResponseEntity<Iterable<Test>> getAllTests() {
        return ResponseEntity.ok(testService.getAllTests());
    }

    //update test status by id
    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<Test> updateTestStatus(@PathVariable int id, @RequestBody Test test) {
        return ResponseEntity.ok(testService.updateTestStatus(id,test));
    }

    
}
