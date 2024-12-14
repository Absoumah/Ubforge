package com.ubforge.ubforge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ubforge.ubforge.model.Release;
import com.ubforge.ubforge.service.ReleaseService;

@RestController
@RequestMapping("/release")
public class ReleaseController {
    @Autowired
    private ReleaseService releaseService;

    @GetMapping("/getAll")
    public List<Release> getAllReleases() {
        return releaseService.getAllReleases();
    }

    @GetMapping("/get/{id}")
    public Release getReleaseById(@PathVariable int id) {
        return releaseService.getReleaseById(id);
    }

    @PostMapping("/create")
    public Release createRelease(@RequestBody Release release) {
        return releaseService.createRelease(release);
    }

    @PutMapping("/update/{id}")
    public Release updateRelease(@PathVariable int id, @RequestBody Release release) {
        release.setId(id);
        return releaseService.updateRelease(release);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRelease(@PathVariable int id) {
        releaseService.deleteRelease(id);
    }

    @PutMapping("/{releaseId}/addSprint/{sprintId}")
    public void addSprintToRelease(@PathVariable int releaseId, @PathVariable int sprintId) {
        releaseService.addSprintToRelease(releaseId, sprintId);
    }

    @PutMapping("/{releaseId}/removeSprint/{sprintId}")
    public void removeSprintFromRelease(@PathVariable int releaseId, @PathVariable int sprintId) {
        releaseService.removeSprintFromRelease(releaseId, sprintId);
    }
}