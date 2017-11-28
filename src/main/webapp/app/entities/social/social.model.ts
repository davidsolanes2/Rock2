import { BaseEntity } from './../../shared';

export class Social implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
