package com.rockbible3.repository;

import com.rockbible3.domain.Instrument;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Instrument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InstrumentRepository extends JpaRepository<Instrument, Long> {

}
