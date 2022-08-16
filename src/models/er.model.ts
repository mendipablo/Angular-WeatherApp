import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Er extends Entity {
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

  constructor(data?: Partial<Er>) {
    super(data);
  }
}

export interface ErRelations {
  // describe navigational properties here
}

export type ErWithRelations = Er & ErRelations;
