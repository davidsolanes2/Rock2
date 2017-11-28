package com.rockbible3.repository;

import com.rockbible3.domain.UserExt;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the UserExt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtRepository extends JpaRepository<UserExt, Long> {
    @Query("select distinct user_ext from UserExt user_ext left join fetch user_ext.albums")
    List<UserExt> findAllWithEagerRelationships();

    @Query("select user_ext from UserExt user_ext left join fetch user_ext.albums where user_ext.id =:id")
    UserExt findOneWithEagerRelationships(@Param("id") Long id);

}
