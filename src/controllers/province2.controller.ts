import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Cba} from '../models';
import {CbaRepository} from '../repositories';

export class Province2Controller {
  constructor(
    @repository(CbaRepository)
    public cbaRepository: CbaRepository,
  ) { }

  @post('/cba')
  @response(200, {
    description: 'Cba model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cba)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cba, {
            title: 'NewCba',
            exclude: ['id'],
          }),
        },
      },
    })
    cba: Omit<Cba, 'id'>,
  ): Promise<Cba> {
    return this.cbaRepository.create(cba);
  }

  @get('/cba/count')
  @response(200, {
    description: 'Cba model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cba) where?: Where<Cba>,
  ): Promise<Count> {
    return this.cbaRepository.count(where);
  }

  @get('/cba')
  @response(200, {
    description: 'Array of Cba model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cba, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cba) filter?: Filter<Cba>,
  ): Promise<Cba[]> {
    return this.cbaRepository.find(filter);
  }

  @patch('/cba')
  @response(200, {
    description: 'Cba PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cba, {partial: true}),
        },
      },
    })
    cba: Cba,
    @param.where(Cba) where?: Where<Cba>,
  ): Promise<Count> {
    return this.cbaRepository.updateAll(cba, where);
  }

  @get('/cba/{id}')
  @response(200, {
    description: 'Cba model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cba, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: string,
    @param.filter(Cba, {exclude: 'where'}) filter?: FilterExcludingWhere<Cba>
  ): Promise<Cba> {
    return this.cbaRepository.findById(id, filter);
  }

  @patch('/cba/{id}')
  @response(204, {
    description: 'Cba PATCH success',
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cba, {partial: true}),
        },
      },
    })
    cba: Cba,
  ): Promise<void> {
    await this.cbaRepository.updateById(id, cba);
  }

  @put('/cba/{id}')
  @response(204, {
    description: 'Cba PUT success',
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() cba: Cba,
  ): Promise<void> {
    await this.cbaRepository.replaceById(id, cba);
  }

  @del('/cba/{id}')
  @response(204, {
    description: 'Cba DELETE success',
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.cbaRepository.deleteById(id);
  }
}
