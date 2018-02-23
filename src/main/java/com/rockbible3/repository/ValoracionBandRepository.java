package com.rockbible3.repository;

import com.rockbible3.domain.ValoracionBand;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the ValoracionBand entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ValoracionBandRepository extends JpaRepository<ValoracionBand, Long> {

    @Query("select valoracion_band from ValoracionBand valoracion_band where valoracion_band.user.login = ?#{principal.username}")
    List<ValoracionBand> findByUserIsCurrentUser();

}
