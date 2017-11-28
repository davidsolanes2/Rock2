package com.rockbible3.repository;

import com.rockbible3.domain.Song;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Song entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

}
