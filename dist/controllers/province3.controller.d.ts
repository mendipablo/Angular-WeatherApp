import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Er } from '../models';
import { ErRepository } from '../repositories';
export declare class Province3Controller {
    erRepository: ErRepository;
    constructor(erRepository: ErRepository);
    create(er: Omit<Er, 'id'>): Promise<Er>;
    count(where?: Where<Er>): Promise<Count>;
    find(filter?: Filter<Er>): Promise<Er[]>;
    updateAll(er: Er, where?: Where<Er>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Er>): Promise<Er>;
    updateById(id: string, er: Er): Promise<void>;
    replaceById(id: string, er: Er): Promise<void>;
    deleteById(id: string): Promise<void>;
}
