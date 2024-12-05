package com.ubforge.ubforge.service;


import org.springframework.stereotype.Service;
import com.ubforge.ubforge.model.Documentation;
import com.ubforge.ubforge.repository.DocumentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;


@Service
public class DocumentationService {

    @Autowired
    private DocumentationRepository documentationRepository;

    public Documentation createDocumentation(Documentation documentation) {
        return documentationRepository.save(documentation);
    }

    public List<Documentation> getDocumentationsByProjectId(Integer projectId) {
        return documentationRepository.findByProjectId(projectId);
    }

    public Documentation updateDocumentationProjectId(Integer id, Documentation documentation) {
        Documentation existingDocumentation = documentationRepository.findById(id).orElse(null);
        existingDocumentation.setTitle(documentation.getTitle());
        existingDocumentation.setContent(documentation.getContent());
        existingDocumentation.setProjectId(documentation.getProjectId());
        return documentationRepository.save(existingDocumentation);
    }
    
}
