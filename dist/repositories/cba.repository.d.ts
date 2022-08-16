import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Cba, CbaRelations } from '../models';
export declare class CbaRepository extends DefaultCrudRepository<Cba, typeof Cba.prototype.id, CbaRelations> {
    constructor(dataSource: MongoDbDataSource);
}
