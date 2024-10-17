package com.nebudevs.springBackEnd.controller;

import com.nebudevs.springBackEnd.dto.ActivityDto;
import com.nebudevs.springBackEnd.model.Activity;
import com.nebudevs.springBackEnd.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedModel;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/activity")
public class ActivityController {

    @Autowired
    ActivityService activityService;
    @GetMapping("/all")
    public ResponseEntity<Page<ActivityDto>> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Page<ActivityDto> activities = activityService.getAll(page, size);
        return  ResponseEntity.ok(activities);

    }

    @GetMapping("/id/{id}")
    public ResponseEntity<ActivityDto> getActivityById(@PathVariable int id){
        ActivityDto activity = activityService.getActivityById(id);
        return ResponseEntity.ok(activity);
    }


    @GetMapping("/type/{type}")
    public ResponseEntity<Page<ActivityDto>> getActivitiesByType(@PathVariable String type, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Page<ActivityDto> activities = activityService.getActivitiesByType(type, page , size);
        return  ResponseEntity.ok(activities);
    }

    @GetMapping("/full-text/{textActivity}")
    public ResponseEntity<Page<ActivityDto>> getActivitiesLikeText(@PathVariable String textActivity, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Page<ActivityDto> activities = activityService.getActivitesLikeText(textActivity, page, size);
        return ResponseEntity.ok(activities);

    }

}
