import { BaseEntity, User } from './../../shared';

export class ValoracionArtist implements BaseEntity {
    constructor(
        public id?: number,
        public puntuacion?: number,
        public like?: boolean,
        public timestamp?: any,
        public artist?: BaseEntity,
        public user?: User,
    ) {
        this.like = false;
    }
}
