import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Bsas, BsasRelations} from '../models';

export class BsasRepository extends DefaultCrudRepository<
  Bsas,
  typeof Bsas.prototype.id,
  BsasRelations
> {
  constructor(

    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Bsas, dataSource);
  }
  /*
     @inject('datasources.dbMemory') dataSource: DbMemoryDataSource,
   ) {
     super(Bsas, dataSource);
   }
   */
}
