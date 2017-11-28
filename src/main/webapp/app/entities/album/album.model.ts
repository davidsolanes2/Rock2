import { BaseEntity } from './../../shared';

export class Album implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public numSongs?: number,
        public releaseDate?: any,
        public band?: BaseEntity,
        public songs?: BaseEntity[],
        public valoracions?: BaseEntity[],
        public users?: BaseEntity[],
    ) {
    }
}
