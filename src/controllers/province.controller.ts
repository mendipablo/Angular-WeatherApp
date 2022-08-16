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
import {Bsas} from '../models';
import {BsasRepository} from '../repositories';

export class ProvinceController {
  constructor(
    @repository(BsasRepository)
    public bsasRepository: BsasRepository,
  ) { }

  @post('/bsas')
  @response(200, {
    description: 'Bsas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bsas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bsas, {
            title: 'NewBsas',
            exclude: ['id'],
          }),
        },
      },
    })
    bsas: Omit<Bsas, 'id'>,
  ): Promise<Bsas> {
    return this.bsasRepository.create(bsas);
  }

  @get('/bsas/count')
  @response(200, {
    description: 'Bsas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bsas) where?: Where<Bsas>,
  ): Promise<Count> {
    return this.bsasRepository.count(where);
  }

  @get('/bsas')
  @response(200, {
    description: 'Array of Bsas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bsas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bsas) filter?: Filter<Bsas>,
  ): Promise<Bsas[]> {
    return this.bsasRepository.find(filter);
  }

  @patch('/bsas')
  @response(200, {
    description: 'Bsas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bsas, {partial: true}),
        },
      },
    })
    bsas: Bsas,
    @param.where(Bsas) where?: Where<Bsas>,
  ): Promise<Count> {
    return this.bsasRepository.updateAll(bsas, where);
  }

  @get('/bsas/{id}')
  @response(200, {
    description: 'Bsas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bsas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: string,
    @param.filter(Bsas, {exclude: 'where'}) filter?: FilterExcludingWhere<Bsas>
  ): Promise<Bsas> {
    return this.bsasRepository.findById(id, filter);
  }

  @patch('/bsas/{id}')
  @response(204, {
    description: 'Bsas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bsas, {partial: true}),
        },
      },
    })
    bsas: Bsas,
  ): Promise<void> {
    await this.bsasRepository.updateById(id, bsas);
  }

  @put('/bsas/{id}')
  @response(204, {
    description: 'Bsas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() bsas: Bsas,
  ): Promise<void> {
    await this.bsasRepository.replaceById(id, bsas);
  }

  @del('/bsas/{id}')
  @response(204, {
    description: 'Bsas DELETE success',
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.bsasRepository.deleteById(id);
  }
}
