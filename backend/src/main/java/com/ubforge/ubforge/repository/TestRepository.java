package com.ubforge.ubforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ubforge.ubforge.model.Teste;

@Repository
public interface TestRepository extends JpaRepository<Teste, Integer> {

} 
