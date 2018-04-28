package com.rockbible3.repository;

import com.rockbible3.domain.Collections;
import com.rockbible3.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Collections entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CollectionsRepository extends JpaRepository<Collections, Long> {

    @Query("select collections from Collections collections where collections.user.login = ?#{principal.username}")
    List<Collections> findByUserIsCurrentUser();

    List<Collections> findAllByUser(User usuario);

    List<Collections> findByNapsterIdInAndUserLogin(List<String> NapsterSongIds, String login);

    List<Collections> findByUserLoginAndNapsterId(User userLogin, String napsterId);


}
