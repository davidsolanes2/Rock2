package com.rockbible3.repository;


import com.rockbible3.domain.Song;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Song entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    /**
     * Buscar Song por GenreName
     */
    List<Song> findSongByGenre_Name(String nombreGenero);
    List<Song> findSongByGenre_NameContaining(String nombreGenero);
}
