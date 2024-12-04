package com.ubforge.ubforge.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import com.ubforge.ubforge.model.Issue;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer> {

    @Query(value = "SELECT issue_id FROM assignedIssues WHERE user_id = :userId", nativeQuery = true)
    Set<Integer> findIssueIdsByUserId(int userId);

    @Query(value = "INSERT INTO assignedIssues (issue_id, user_id) VALUES (:issueId, :userId)", nativeQuery = true)
    Issue assignToUser(int issueId, int userId);

    
}
