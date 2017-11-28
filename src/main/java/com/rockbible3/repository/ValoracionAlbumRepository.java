package com.rockbible3.repository;

import com.rockbible3.domain.ValoracionAlbum;
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

}
