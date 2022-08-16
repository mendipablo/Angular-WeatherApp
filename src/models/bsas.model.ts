import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Bsas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;


  @property({
    type: 'array',
    itemType: 'any',
    required: true,
  })
  weather: any[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Bsas>) {
    super(data);
  }
}

export interface BsasRelations {
  // describe navigational properties here
}

export type BsasWithRelations = Bsas & BsasRelations;
