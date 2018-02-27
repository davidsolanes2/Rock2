import { BaseEntity, User } from './../../shared';

export class Collections implements BaseEntity {
    constructor(
        public id?: number,
        public napsterId?: string,
        public type?: string,
        public user?: User,
    ) {
    }
}
