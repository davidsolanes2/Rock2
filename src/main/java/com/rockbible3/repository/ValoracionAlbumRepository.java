package com.rockbible3.repository;

import com.rockbible3.domain.ValoracionAlbum;
import com.rockbible3.service.dto.ValoracionAlbumStats;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the ValoracionAlbum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ValoracionAlbumRepository extends JpaRepository<ValoracionAlbum, Long> {

    @Query("select valoracion_album from ValoracionAlbum valoracion_album where valoracion_album.user.login = ?#{principal.username}")
    List<ValoracionAlbum> findByUserIsCurrentUser();

    @Query("select new com.rockbible3.service.dto.ValoracionAlbumStats(valoracionAlbum.album , " +
        "avg(valoracionAlbum.puntuacion), max(valoracionAlbum.puntuacion), min(valoracionAlbum.puntuacion)) " +
        "from ValoracionAlbum valoracionAlbum where valoracionAlbum.album.id = :albumId")
    ValoracionAlbumStats findAlbumsStats(@Param("albumId") Long Id);



}
