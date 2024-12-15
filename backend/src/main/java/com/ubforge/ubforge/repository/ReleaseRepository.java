package com.ubforge.ubforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ubforge.ubforge.model.Release;

@Repository
public interface ReleaseRepository extends JpaRepository<Release, Integer> { 
    List<Release> findByProjectId(int projectId);
}
