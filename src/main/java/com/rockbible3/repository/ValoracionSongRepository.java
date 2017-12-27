package com.rockbible3.repository;

import com.rockbible3.domain.Song;
import com.rockbible3.domain.ValoracionSong;
import com.rockbible3.service.dto.ValoracionSongStats;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the ValoracionSong entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ValoracionSongRepository extends JpaRepository<ValoracionSong, Long> {

    @Query("select valoracion_song from ValoracionSong valoracion_song where valoracion_song.user.login = ?#{principal.username}")
    List<ValoracionSong> findByUserIsCurrentUser();

    @Query("select new com.rockbible3.service.dto.ValoracionSongStats(valoracionSong.song , " +
        "avg(valoracionSong.puntuacion), max(valoracionSong.puntuacion), min(valoracionSong.puntuacion)) " +
        "from ValoracionSong valoracionSong where valoracionSong.song.id = :songId")
    ValoracionSongStats findSongsStats(@Param("songId") Long Id);


}
