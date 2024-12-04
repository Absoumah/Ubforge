package com.ubforge.ubforge.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ubforge.ubforge.model.Project;
import com.ubforge.ubforge.repository.ProjectRepository;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    //read project by id
    public Optional<Project> getProjectById(int id) {
        return projectRepository.findById(id);
    }

    //read all projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    //update project
    public void updateProject(int id, Project project) {
        if (projectRepository.existsById(id)) {
            project.setId(id);
            projectRepository.save(project);
        }
    }

    //delete project
    public void deleteProject(int id) {
        projectRepository.deleteById(id);
    }


}