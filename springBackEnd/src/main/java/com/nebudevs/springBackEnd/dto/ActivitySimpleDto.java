package com.nebudevs.springBackEnd.dto;

public class ActivitySimpleDto {

    private Long id;
    private String activityTypes;
    private String nomDuPoi;
    private String commune;
    private Float latitude;
    private Float longitude;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActivityTypes() {
        return activityTypes;
    }

    public void setActivityTypes(String activityTypes) {
        this.activityTypes = activityTypes;
    }

    public String getNomDuPoi() {
        return nomDuPoi;
    }

    public void setNomDuPoi(String nomDuPoi) {
        this.nomDuPoi = nomDuPoi;
    }

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }
}

