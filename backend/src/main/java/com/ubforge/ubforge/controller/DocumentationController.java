package com.ubforge.ubforge.controller;

import com.ubforge.ubforge.model.Documentation;
import com.ubforge.ubforge.service.DocumentationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/documentation")
@CrossOrigin(origins = "http://localhost:4200")
public class DocumentationController {
    
    @Autowired
    private DocumentationService documentationService;

    @PostMapping("/create")
    public ResponseEntity<Documentation> createDocumentation(@RequestBody Documentation documentation) {
        Documentation created = documentationService.createDocumentation(documentation);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Documentation>> getDocumentationsByProject(@PathVariable Integer projectId) {
        List<Documentation> docs = documentationService.getDocumentationsByProjectId(projectId);
        return new ResponseEntity<>(docs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Documentation> getDocumentationById(@PathVariable Integer id) {
        Documentation doc = documentationService.getDocumentationById(id);
        return doc != null ? 
            new ResponseEntity<>(doc, HttpStatus.OK) : 
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Documentation> updateDocumentation(
            @PathVariable Integer id, 
            @RequestBody Documentation documentation) {
        Documentation updated = documentationService.updateDocumentation(id, documentation);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocumentation(@PathVariable Integer id) {
        documentationService.deleteDocumentation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}