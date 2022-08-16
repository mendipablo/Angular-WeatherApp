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
import {Er} from '../models';
import {ErRepository} from '../repositories';

export class Province3Controller {
  constructor(
    @repository(ErRepository)
    public erRepository: ErRepository,
  ) { }

  @post('/er')
  @response(200, {
    description: 'Er model instance',
    content: {'application/json': {schema: getModelSchemaRef(Er)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Er, {
            title: 'NewEr',
            exclude: ['id'],
          }),
        },
      },
    })
    er: Omit<Er, 'id'>,
  ): Promise<Er> {
    return this.erRepository.create(er);
  }

  @get('/er/count')
  @response(200, {
    description: 'Er model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Er) where?: Where<Er>,
  ): Promise<Count> {
    return this.erRepository.count(where);
  }

  @get('/er')
  @response(200, {
    description: 'Array of Er model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Er, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Er) filter?: Filter<Er>,
  ): Promise<Er[]> {
    return this.erRepository.find(filter);
  }

  @patch('/er')
  @response(200, {
    description: 'Er PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Er, {partial: true}),
        },
      },
    })
    er: Er,
    @param.where(Er) where?: Where<Er>,
  ): Promise<Count> {
    return this.erRepository.updateAll(er, where);
  }

  @get('/er/{id}')
  @response(200, {
    description: 'Er model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Er, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: string,
    @param.filter(Er, {exclude: 'where'}) filter?: FilterExcludingWhere<Er>
  ): Promise<Er> {
    return this.erRepository.findById(id, filter);
  }

  @patch('/er/{id}')
  @response(204, {
    description: 'Er PATCH success',
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Er, {partial: true}),
        },
      },
    })
    er: Er,
  ): Promise<void> {
    await this.erRepository.updateById(id, er);
  }

  @put('/er/{id}')
  @response(204, {
    description: 'Er PUT success',
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() er: Er,
  ): Promise<void> {
    await this.erRepository.replaceById(id, er);
  }

  @del('/er/{id}')
  @response(204, {
    description: 'Er DELETE success',
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.erRepository.deleteById(id);
  }
}
