package com.ubforge.ubforge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ubforge.ubforge.model.Test;
import com.ubforge.ubforge.repository.TestRepository;

@Service
public class TestService {
    @Autowired
    private TestRepository testRepository;

    public Test createTest(Test test) {
        return testRepository.save(test);
    }

    public Iterable<Test> getAllTests() {
        return testRepository.findAll();
    }

    //update test status
    public Test updateTestStatus(int id, Test test) {
        if (testRepository.existsById(id)) {
            test.setId(id);
            return testRepository.save(test);
        }
        return null;
    }
    
}
