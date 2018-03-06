package com.rockbible3.repository;

import com.rockbible3.domain.CollectionsTicketMaster;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the CollectionsTicketMaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CollectionsTicketMasterRepository extends JpaRepository<CollectionsTicketMaster, Long> {

    @Query("select collections_ticket_master from CollectionsTicketMaster collections_ticket_master where collections_ticket_master.user.login = ?#{principal.username}")
    List<CollectionsTicketMaster> findByUserIsCurrentUser();

}
