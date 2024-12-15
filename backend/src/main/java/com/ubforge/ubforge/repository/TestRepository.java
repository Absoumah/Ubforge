package com.ubforge.ubforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ubforge.ubforge.model.Test;

@Repository
public interface TestRepository extends JpaRepository<Test, Integer> {

} 
