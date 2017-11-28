import { BaseEntity } from './../../shared';

export class Country implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public locationGoogleMaps?: string,
        public latitude?: number,
        public logitude?: number,
        public bands?: BaseEntity[],
        public artists?: BaseEntity[],
    ) {
    }
}
