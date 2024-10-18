package com.nebudevs.springBackEnd.dto;

import com.nebudevs.springBackEnd.model.Activity;
import com.nebudevs.springBackEnd.utile.HaversineDistance;

public class DistanceActivityDto extends ActivityDto{

    private double distance;
    public DistanceActivityDto(Activity activity) {
        super(activity);
    }

    public DistanceActivityDto(Activity activity, float latitude, float longitude){
        super(activity);
        this.distance = HaversineDistance.calculateHaversineDistance(activity.getLatitude(), activity.getLongitude(), latitude, longitude);
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }
}
