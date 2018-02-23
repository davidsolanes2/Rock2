import { BaseEntity, User } from './../../shared';

export class Collections implements BaseEntity {
    constructor(
        public id?: number,
        public trackId?: string,
        public concertId?: string,
        public artistId?: string,
        public type?: string,
        public user?: User,
    ) {
    }
}
