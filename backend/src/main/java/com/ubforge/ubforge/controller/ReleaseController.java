package com.ubforge.ubforge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/getById/{id}")
    public Release getReleaseById(@PathVariable int id) {
        return releaseService.getReleaseById(id);
    }

    //get status of release
    @GetMapping("/getReleaseStatus/{id}")
    public String getReleaseStatus(@PathVariable int id) {
        return releaseService.getReleaseStatus(id);
    }

    //put status of release
    @PostMapping("/setReleaseStatus/{id}/{status}")
    public String setReleaseStatus(@PathVariable int id, @PathVariable String status) {
        return releaseService.setReleaseStatus(id, status);
    }

    @PostMapping("/create")
    public Release createRelease(@RequestBody Release release) {
        return releaseService.createRelease(release);
    }

    @DeleteMapping("/releases/{id}")
    public void deleteRelease(@PathVariable int id) {
        releaseService.deleteRelease(id);
    }
}
