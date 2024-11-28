package com.ubforge.ubforge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ubforge.ubforge.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
}
