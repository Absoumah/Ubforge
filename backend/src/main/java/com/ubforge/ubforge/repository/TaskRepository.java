package com.ubforge.ubforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ubforge.ubforge.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    Iterable<Task> findByAssignToId(int id);

    Iterable<Task> findTasksByIssueId(int issueId);

    
}
