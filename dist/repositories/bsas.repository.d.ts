import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Bsas, BsasRelations } from '../models';
export declare class BsasRepository extends DefaultCrudRepository<Bsas, typeof Bsas.prototype.id, BsasRelations> {
    constructor(dataSource: MongoDbDataSource);
}
