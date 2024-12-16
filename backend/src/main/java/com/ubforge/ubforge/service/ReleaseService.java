package com.ubforge.ubforge.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ubforge.ubforge.model.Release;
import com.ubforge.ubforge.repository.ReleaseRepository;

@Service
public class ReleaseService {
    @Autowired
    private ReleaseRepository releaseRepository;

    public List<Release> getAllReleases() {
        return releaseRepository.findAll();
    }

    public Release getReleaseById(int id) {
        return releaseRepository.findById(id).orElse(null);
    }

    public List<Release> getReleasesByProject(int projectId) {
        return releaseRepository.findByProjectId(projectId);
    }

    public Release createRelease(Release release) {
        return releaseRepository.save(release);
    }

    public Release updateRelease(Release release) {
        return releaseRepository.save(release);
    }

    public void deleteRelease(int id) {
        releaseRepository.deleteById(id);
    }

    public void addSprintToRelease(int releaseId, int sprintId) {
        Optional<Release> optionalRelease = releaseRepository.findById(releaseId);
        if (optionalRelease.isPresent()) {
            Release release = optionalRelease.get();
            List<Integer> sprintIds = release.getSprintIds();
            if (!sprintIds.contains(sprintId)) {
                sprintIds.add(sprintId);
                release.setSprintIds(sprintIds);
                releaseRepository.save(release);
            }
        }
    }

    public void removeSprintFromRelease(int releaseId, int sprintId) {
        Optional<Release> optionalRelease = releaseRepository.findById(releaseId);
        if (optionalRelease.isPresent()) {
            Release release = optionalRelease.get();
            List<Integer> sprintIds = release.getSprintIds();
            if (sprintIds.contains(sprintId)) {
                sprintIds.remove(Integer.valueOf(sprintId));
                release.setSprintIds(sprintIds);
                releaseRepository.save(release);
            }
        }
    }
}