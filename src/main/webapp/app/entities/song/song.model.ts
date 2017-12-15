import { BaseEntity } from './../../shared';

export class Song implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public genre?: BaseEntity,
        public album?: BaseEntity,
        public valoracions?: BaseEntity[],
    ) {
    }
}
