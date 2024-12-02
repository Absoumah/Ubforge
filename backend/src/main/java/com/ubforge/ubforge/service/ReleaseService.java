package com.ubforge.ubforge.service;

import java.util.List;

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

    public Release createRelease(Release release) {
        return releaseRepository.save(release);
    }

    public void deleteRelease(int id) {
        releaseRepository.deleteById(id);
    }

    public String getReleaseStatus(int id) {
        Release release = releaseRepository.findById(id).orElse(null);
        if (release == null) {
            return "Release not found";
        }
        return release.getStatus();
    }

    public String setReleaseStatus(int id, String status) {
        Release release = releaseRepository.findById(id).orElse(null);
        if (release == null) {
            return "Release not found";
        }
        release.setStatus(status);
        releaseRepository.save(release);
        return "Status updated";
    }
}
