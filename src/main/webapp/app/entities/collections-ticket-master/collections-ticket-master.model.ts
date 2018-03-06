import { BaseEntity, User } from './../../shared';

export class CollectionsTicketMaster implements BaseEntity {
    constructor(
        public id?: number,
        public ticketMasterId?: string,
        public user?: User,
    ) {
    }
}
