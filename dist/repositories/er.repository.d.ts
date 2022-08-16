import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Er, ErRelations } from '../models';
export declare class ErRepository extends DefaultCrudRepository<Er, typeof Er.prototype.id, ErRelations> {
    constructor(dataSource: MongoDbDataSource);
}
