import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVO',
    'DESCANSO',
    'RETIRADO'
}

export class Band implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public locationGoogleMaps?: string,
        public latitude?: number,
        public logitude?: number,
        public status?: Status,
        public country?: BaseEntity,
        public label?: BaseEntity,
        public genres?: BaseEntity[],
        public albums?: BaseEntity[],
        public artists?: BaseEntity[],
        public valoracions?: BaseEntity[],
    ) {
    }
}
