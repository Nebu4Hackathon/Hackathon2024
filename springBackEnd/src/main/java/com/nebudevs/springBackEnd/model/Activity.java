package com.nebudevs.springBackEnd.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nomDuPoi;
    private String type;

    private Float latitude;

    private Float longitude;

    private String adressePostale;

    @Column(name = "codePostal")
    private String codePostale;

    private String commune;

    private String createurDeLaDonnee;

    private String sitDiffuseur;

    @Column(name = "date_de_mise_a_jour")
    private LocalDate lastUpdate;

    private String contactDuPoi;

    private String classementDuPoi;

    private String description;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNomDuPoi() {
        return nomDuPoi;
    }

    public void setNomDuPoi(String nomDuPoi) {
        this.nomDuPoi = nomDuPoi;
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

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
