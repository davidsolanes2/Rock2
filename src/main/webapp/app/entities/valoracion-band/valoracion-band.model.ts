import { BaseEntity, User } from './../../shared';

export class ValoracionBand implements BaseEntity {
    constructor(
        public id?: number,
        public puntuacion?: number,
        public like?: boolean,
        public timestamp?: any,
        public band?: BaseEntity,
        public user?: User,
    ) {
        this.like = false;
    }
}
