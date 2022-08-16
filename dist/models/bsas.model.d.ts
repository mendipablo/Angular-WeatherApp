import { Entity } from '@loopback/repository';
export declare class Bsas extends Entity {
    id?: string;
    city: string;
    date: string;
    weather: any[];
    [prop: string]: any;
    constructor(data?: Partial<Bsas>);
}
export interface BsasRelations {
}
export declare type BsasWithRelations = Bsas & BsasRelations;
