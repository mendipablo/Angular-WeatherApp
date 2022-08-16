import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Cba, CbaRelations} from '../models';

export class CbaRepository extends DefaultCrudRepository<
  Cba,
  typeof Cba.prototype.id,
  CbaRelations
> {
  constructor(

    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Cba, dataSource);
  }
  /*
      @inject('datasources.dbMemory') dataSource: DbMemoryDataSource,
    ) {
      super(Cba, dataSource);
    }
    */
}
