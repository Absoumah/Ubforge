package com.ubforge.ubforge.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ubforge.ubforge.model.Issue;
import com.ubforge.ubforge.model.User;
import com.ubforge.ubforge.repository.IssueRepository;
import com.ubforge.ubforge.repository.UserRepository;

@Service
public class IssueService {
    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;
    
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
    

    public void assignToUser(int issueId, int userId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        issueRepository.assignToUser(issueId, userId);
    }

    public Issue addToRelease(int issueId, int releaseId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        issue.setReleaseId(releaseId);
        return issueRepository.save(issue);
    }

    public Set<Integer> findIssueIdsByUserId(int userId) {
        return issueRepository.findIssueIdsByUserId(userId);
    }
}
