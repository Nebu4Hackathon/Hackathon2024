package com.nebudevs.springBackEnd.repository;

import com.nebudevs.springBackEnd.dto.ActivityDto;
import com.nebudevs.springBackEnd.model.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends PagingAndSortingRepository<Activity, Integer>, CrudRepository<Activity, Integer> {


    Page<Activity> findByType(String type, PageRequest page);


    @Query("SELECT a from Activity a where nomDuPoi LIKE %:textActivity% OR description LIKE %:textActivity%" )
    Page<Activity> findActivitiesLikeText(String textActivity, PageRequest of);

    @Query("SELECT a FROM Activity a " +
            "WHERE (6371 * acos(" +
            "        cos(radians(:latitude)) * cos(radians(a.latitude)) * " +
            "        cos(radians(a.longitude) - radians(:longitude)) + " +  // Ajout de la virgule ici
            "        sin(radians(:latitude)) * sin(radians(a.latitude))" +
            "    )" +
            ") < :distance")
    Page<Activity> findActivitiesByLocationHaversine(float latitude, float longitude, float distance, PageRequest of);
}
