package com.rockbible3.repository;

import com.rockbible3.domain.Collections;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Collections entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CollectionsRepository extends JpaRepository<Collections, Long> {

    @Query("select collections from Collections collections where collections.user.login = ?#{principal.username}")
    List<Collections> findByUserIsCurrentUser();

}
