package com.ubforge.ubforge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ubforge.ubforge.model.Teste;
import com.ubforge.ubforge.repository.TestRepository;

@Service
public class TestService {
    @Autowired
    private TestRepository testRepository;

    public Teste createTest(Teste test) {
        return testRepository.save(test);
    }

    public Iterable<Teste> getAllTests() {
        return testRepository.findAll();
    }

    //update test status
    public Teste updateTestStatus(int id, Teste test) {
        if (testRepository.existsById(id)) {
            test.setId(id);
            return testRepository.save(test);
        }
        return null;
    }
    
}
