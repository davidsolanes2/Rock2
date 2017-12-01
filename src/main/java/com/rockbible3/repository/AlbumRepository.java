package com.rockbible3.repository;

import com.rockbible3.domain.Album;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Album entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    //List<Album> findByBand_NameBand(String bandaNombre);
    List<Album> findByBand_Name(String nombreBanda);

    //List<Album> findByBand_NameBandContaining(String bandaNombre);
    List<Album> findByBand_NameContaining(String bandaNombre);

}
