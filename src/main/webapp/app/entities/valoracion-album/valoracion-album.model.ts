import { BaseEntity, User } from './../../shared';

export class ValoracionAlbum implements BaseEntity {
    constructor(
        public id?: number,
        public puntuacion?: number,
        public like?: boolean,
        public timestamp?: any,
        public album?: BaseEntity,
        public user?: User,
    ) {
        this.like = false;
    }
}
