package com.rockbible3.repository;

import com.rockbible3.domain.ValoracionArtist;
import com.rockbible3.service.dto.ValoracionArtistStats;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the ValoracionArtist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ValoracionArtistRepository extends JpaRepository<ValoracionArtist, Long> {

    @Query("select valoracion_artist from ValoracionArtist valoracion_artist where valoracion_artist.user.login = ?#{principal.username}")
    List<ValoracionArtist> findByUserIsCurrentUser();

    @Query("select new com.rockbible3.service.dto.ValoracionArtistStats(valoracionArtist.artist , " +
        "avg(valoracionArtist.puntuacion), max(valoracionArtist.puntuacion), min(valoracionArtist.puntuacion)) " +
        "from ValoracionArtist valoracionArtist where valoracionArtist.artist.id = :artistId")
    ValoracionArtistStats findArtistsStats(@Param("artistId") Long Id);

}
