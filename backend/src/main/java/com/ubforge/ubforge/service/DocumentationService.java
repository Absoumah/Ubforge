package com.ubforge.ubforge.service;

import org.springframework.stereotype.Service;
import com.ubforge.ubforge.model.Documentation;
import com.ubforge.ubforge.repository.DocumentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Date;

@Service
public class DocumentationService {

    @Autowired
    private DocumentationRepository documentationRepository;

    public Documentation createDocumentation(Documentation documentation) {
        documentation.setCreatedAt(new Date());
        documentation.setUpdatedAt(new Date());
        return documentationRepository.save(documentation);
    }

    public List<Documentation> getDocumentationsByProjectId(Integer projectId) {
        return documentationRepository.findByProjectId(projectId);
    }

    public Documentation getDocumentationById(Integer id) {
        return documentationRepository.findById(id).orElse(null);
    }

    public Documentation updateDocumentation(Integer id, Documentation documentation) {
        Documentation existingDoc = documentationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Documentation not found"));
        
        existingDoc.setTitle(documentation.getTitle());
        existingDoc.setContent(documentation.getContent());
        existingDoc.setCategory(documentation.getCategory());
        existingDoc.setStatus(documentation.getStatus());
        existingDoc.setTags(documentation.getTags());
        existingDoc.setVersion(documentation.getVersion());
        existingDoc.setUpdatedAt(new Date());
        
        return documentationRepository.save(existingDoc);
    }

    public void deleteDocumentation(Integer id) {
        documentationRepository.deleteById(id);
    }
}