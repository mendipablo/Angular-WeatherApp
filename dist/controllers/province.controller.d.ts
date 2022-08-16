import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Bsas } from '../models';
import { BsasRepository } from '../repositories';
export declare class ProvinceController {
    bsasRepository: BsasRepository;
    constructor(bsasRepository: BsasRepository);
    create(bsas: Omit<Bsas, 'id'>): Promise<Bsas>;
    count(where?: Where<Bsas>): Promise<Count>;
    find(filter?: Filter<Bsas>): Promise<Bsas[]>;
    updateAll(bsas: Bsas, where?: Where<Bsas>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Bsas>): Promise<Bsas>;
    updateById(id: string, bsas: Bsas): Promise<void>;
    replaceById(id: string, bsas: Bsas): Promise<void>;
    deleteById(id: string): Promise<void>;
}
