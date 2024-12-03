package com.ubforge.ubforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ubforge.ubforge.model.User;
import java.util.Set;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT user_id FROM assignedIssues WHERE issue_id = :issueId", nativeQuery = true)
    Set<Integer> findUserIdsByIssueId(int issueId);
    
}
