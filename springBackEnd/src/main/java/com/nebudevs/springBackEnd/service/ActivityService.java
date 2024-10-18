package com.nebudevs.springBackEnd.service;

import com.nebudevs.springBackEnd.dto.ActivityDto;
import com.nebudevs.springBackEnd.dto.DistanceActivityDto;
import com.nebudevs.springBackEnd.model.Activity;
import com.nebudevs.springBackEnd.repository.ActivityRepository;
import com.nebudevs.springBackEnd.utile.HaversineDistance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    private final int EARTH_RADIUS= 6371;
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

    public Page<DistanceActivityDto> getActivitiesByLocationHaversine(float longitude, float latitude, float distance, int page, int size) {
        Page<Activity> activities = activityRespoistory.findActivitiesByLocationHaversine(latitude,longitude,distance, PageRequest.of(page, size));
        return activities.map(activity -> new DistanceActivityDto(activity,latitude,longitude));
    }
}
