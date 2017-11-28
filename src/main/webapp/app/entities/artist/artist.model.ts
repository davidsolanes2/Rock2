import { BaseEntity } from './../../shared';

export const enum Sex {
    'HOMBRE',
    'MUJER',
    'OTROS'
}

export const enum Status {
    'ACTIVO',
    'DESCANSO',
    'RETIRADO'
}

export class Artist implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public sexo?: Sex,
        public born?: any,
        public deathDate?: any,
        public status?: Status,
        public band?: BaseEntity,
        public country?: BaseEntity,
        public label?: BaseEntity,
        public instruments?: BaseEntity[],
        public valoracions?: BaseEntity[],
    ) {
    }
}
