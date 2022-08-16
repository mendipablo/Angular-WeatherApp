import { Entity } from '@loopback/repository';
export declare class Cba extends Entity {
    id?: string;
    city: string;
    date: string;
    weather: any[];
    [prop: string]: any;
    constructor(data?: Partial<Cba>);
}
export interface CbaRelations {
}
export declare type CbaWithRelations = Cba & CbaRelations;
