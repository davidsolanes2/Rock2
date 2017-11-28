import { BaseEntity, User } from './../../shared';

export class UserExt implements BaseEntity {
    constructor(
        public id?: number,
        public imageContentType?: string,
        public image?: any,
        public latitude?: number,
        public logitude?: number,
        public locationGoogleMaps?: string,
        public user?: User,
        public albums?: BaseEntity[],
    ) {
    }
}
