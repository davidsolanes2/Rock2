import { BaseEntity } from './../../shared';

export class Instrument implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public artists?: BaseEntity[],
    ) {
    }
}
