import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Er, ErRelations} from '../models';

export class ErRepository extends DefaultCrudRepository<
  Er,
  typeof Er.prototype.id,
  ErRelations
> {
  constructor(

    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Er, dataSource);
  }
  /*
@inject('datasources.dbMemory') dataSource: DbMemoryDataSource,
) {
super(Er, dataSource);
}
*/
}
