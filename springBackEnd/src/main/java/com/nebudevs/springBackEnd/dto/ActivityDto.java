package com.nebudevs.springBackEnd.dto;

import com.nebudevs.springBackEnd.model.Activity;
import jakarta.persistence.Column;

import java.time.LocalDate;

public class ActivityDto {

    private int id;
    private String nomDuPoi;
    private String type;
    private Float latitude;
    private Float longitude;
    private String adressePostale;
    private String codePostale;
    private String commune;
    private String createurDeLaDonnee;
    private String sitDiffuseur;
    private String contactDuPoi;
    private String classementDuPoi;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private String description;

    public ActivityDto(Activity activity) {
        this.id = activity.getId();
        this.nomDuPoi = activity.getNomDuPoi();
        this.type = activity.getType();
        this.latitude = activity.getLatitude();
        this.longitude = activity.getLongitude();
        this.adressePostale = activity.getAdressePostale();
        this.codePostale = activity.getCodePostale();
        this.commune = activity.getCommune();
        this.createurDeLaDonnee = activity.getCreateurDeLaDonnee();
        this.sitDiffuseur = activity.getSitDiffuseur();
        this.contactDuPoi = activity.getContactDuPoi();
        this.classementDuPoi = activity.getClassementDuPoi();
        this.description = activity.getDescription();
    }

    public String getNomDuPoi() {
        return nomDuPoi;
    }

    public void setNomDuPoi(String nomDuPoi) {
        this.nomDuPoi = nomDuPoi;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public String getAdressePostale() {
        return adressePostale;
    }

    public void setAdressePostale(String adressePostale) {
        this.adressePostale = adressePostale;
    }

    public String getCodePostale() {
        return codePostale;
    }

    public void setCodePostale(String codePostale) {
        this.codePostale = codePostale;
    }

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public String getCreateurDeLaDonnee() {
        return createurDeLaDonnee;
    }

    public void setCreateurDeLaDonnee(String createurDeLaDonnee) {
        this.createurDeLaDonnee = createurDeLaDonnee;
    }

    public String getSitDiffuseur() {
        return sitDiffuseur;
    }

    public void setSitDiffuseur(String sitDiffuseur) {
        this.sitDiffuseur = sitDiffuseur;
    }

    public String getContactDuPoi() {
        return contactDuPoi;
    }

    public void setContactDuPoi(String contactDuPoi) {
        this.contactDuPoi = contactDuPoi;
    }

    public String getClassementDuPoi() {
        return classementDuPoi;
    }

    public void setClassementDuPoi(String classementDuPoi) {
        this.classementDuPoi = classementDuPoi;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
