package com.ubforge.ubforge.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ubforge.ubforge.model.Issue;
import com.ubforge.ubforge.repository.IssueRepository;

@Service
public class IssueService {
    @Autowired
    private IssueRepository issueRepository;
    
    public Issue createIssue(Issue issue) {
        return issueRepository.save(issue);
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }
    
     public Issue updateIssue(int id, Issue issue) {
        if (issueRepository.existsById(id)) {
            issue.setIssue_id(id);
            return issueRepository.save(issue);
        }
        return null;
    }

    public void deleteIssue(int id) {
        issueRepository.deleteById(id);
    }

    public Issue getIssueById(int id) {
        return issueRepository.findById(id).orElse(null);
    }
    
}
