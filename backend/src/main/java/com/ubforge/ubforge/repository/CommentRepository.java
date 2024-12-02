package com.ubforge.ubforge.repository;

import java.util.List;
import com.ubforge.ubforge.model.Comment;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    public List<Comment> findByEntityIdAndEntityType(int entityId, String entityType);
    
}
