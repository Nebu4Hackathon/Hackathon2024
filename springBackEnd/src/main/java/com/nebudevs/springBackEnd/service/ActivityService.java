package com.nebudevs.springBackEnd.service;

import com.nebudevs.springBackEnd.dto.ActivityDto;
import com.nebudevs.springBackEnd.model.Activity;
import com.nebudevs.springBackEnd.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    ActivityRepository activityRespoistory;


    public Page<ActivityDto> getAll(int page, int size) {

        Page<Activity>  activities = activityRespoistory.findAll(PageRequest.of(page, size));
        return activities.map(ActivityDto::new);
    }

    public ActivityDto getActivityById(int id) {
        Optional<Activity> activity = activityRespoistory.findById(id);
        return activity.map(ActivityDto::new).orElse(null);
    }

    public Page<ActivityDto> getActivitiesByType(String type, int page, int size) {
        Page<Activity> activities =  activityRespoistory.findByType(type, PageRequest.of(page, size));
        return activities.map(ActivityDto::new);
    }

    public Page<ActivityDto> getActivitesLikeText(String textActivity, int page, int size) {
        Page<Activity> activities = activityRespoistory.findActivitiesLikeText(textActivity, PageRequest.of(page, size));
        return activities.map(ActivityDto::new);
    }
}
