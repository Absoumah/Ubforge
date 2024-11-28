package com.ubforge.ubforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ubforge.ubforge.model.Issue;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer> {

    
}
