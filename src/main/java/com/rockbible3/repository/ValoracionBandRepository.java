package com.rockbible3.repository;

import com.rockbible3.domain.ValoracionBand;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ValoracionBand entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ValoracionBandRepository extends JpaRepository<ValoracionBand, Long> {

}
