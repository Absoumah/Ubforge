package com.ubforge.ubforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ubforge.ubforge.model.Sprint;
import java.util.List;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, Integer> {
    List<Sprint> findByProjectId(int projectId);
}