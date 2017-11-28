import { BaseEntity, User } from './../../shared';

export class ValoracionSong implements BaseEntity {
    constructor(
        public id?: number,
        public puntuacion?: number,
        public like?: boolean,
        public timestamp?: any,
        public song?: BaseEntity,
        public user?: User,
    ) {
        this.like = false;
    }
}
