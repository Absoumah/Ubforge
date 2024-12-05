package com.ubforge.ubforge.controller;


import com.ubforge.ubforge.model.Documentation;
import com.ubforge.ubforge.service.DocumentationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/documentation")
public class DocumentationController {

    @Autowired
    private DocumentationService documentationService;

    @PostMapping("/create")
    public ResponseEntity<Documentation> createDocumentation(@RequestBody Documentation documentation) {
        Documentation createdDocumentation = documentationService.createDocumentation(documentation);
        return new ResponseEntity<>(createdDocumentation, HttpStatus.CREATED);
    }

    @GetMapping("/get/{projectId}")
    public ResponseEntity<List<Documentation>> getDocumentationsByProjectId(@PathVariable Integer projectId) {
        List<Documentation> documentations = documentationService.getDocumentationsByProjectId(projectId);
        return new ResponseEntity<>(documentations, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Documentation> updateDocumentationProjectId(@PathVariable Integer id, @RequestBody Documentation documentation) {
        Documentation updatedDocumentation = documentationService.updateDocumentationProjectId(id, documentation);
        return new ResponseEntity<>(updatedDocumentation, HttpStatus.OK);
    }
    
}
