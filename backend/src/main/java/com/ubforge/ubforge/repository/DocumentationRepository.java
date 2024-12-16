package com.ubforge.ubforge.repository;

import java.util.List;
import com.ubforge.ubforge.model.Documentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentationRepository extends JpaRepository<Documentation, Integer> {
    List<Documentation> findByProjectId(Integer projectId);
    
}
