import { BaseEntity } from './../../shared';

export class ValoracionBand implements BaseEntity {
    constructor(
        public id?: number,
        public puntuacion?: number,
        public like?: boolean,
        public timestamp?: any,
        public band?: BaseEntity,
    ) {
        this.like = false;
    }
}
