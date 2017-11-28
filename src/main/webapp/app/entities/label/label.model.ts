import { BaseEntity } from './../../shared';

export class Label implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public foundationdate?: any,
        public bands?: BaseEntity[],
        public artists?: BaseEntity[],
    ) {
    }
}
