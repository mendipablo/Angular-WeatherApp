import { Entity } from '@loopback/repository';
export declare class Er extends Entity {
    id?: string;
    city: string;
    date: string;
    weather: any[];
    [prop: string]: any;
    constructor(data?: Partial<Er>);
}
export interface ErRelations {
}
export declare type ErWithRelations = Er & ErRelations;
