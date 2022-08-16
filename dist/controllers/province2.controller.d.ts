import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Cba } from '../models';
import { CbaRepository } from '../repositories';
export declare class Province2Controller {
    cbaRepository: CbaRepository;
    constructor(cbaRepository: CbaRepository);
    create(cba: Omit<Cba, 'id'>): Promise<Cba>;
    count(where?: Where<Cba>): Promise<Count>;
    find(filter?: Filter<Cba>): Promise<Cba[]>;
    updateAll(cba: Cba, where?: Where<Cba>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Cba>): Promise<Cba>;
    updateById(id: string, cba: Cba): Promise<void>;
    replaceById(id: string, cba: Cba): Promise<void>;
    deleteById(id: string): Promise<void>;
}
