package com.ubforge.ubforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.ubforge.ubforge.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    @Query("SELECT t FROM Task t JOIN t.assignedTo u WHERE u.id = :userId")
    Iterable<Task> findByAssignedToUserId(int userId);

    Iterable<Task> findTasksByIssueId(int issueId);

}
