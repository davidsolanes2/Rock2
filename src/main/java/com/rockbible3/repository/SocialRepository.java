package com.rockbible3.repository;

import com.rockbible3.domain.Social;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Social entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SocialRepository extends JpaRepository<Social, Long> {

}
