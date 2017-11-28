package com.rockbible3.repository;

import com.rockbible3.domain.ValoracionSong;
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

}
