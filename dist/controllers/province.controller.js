"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinceController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ProvinceController = class ProvinceController {
    constructor(bsasRepository) {
        this.bsasRepository = bsasRepository;
    }
    async create(bsas) {
        return this.bsasRepository.create(bsas);
    }
    async count(where) {
        return this.bsasRepository.count(where);
    }
    async find(filter) {
        return this.bsasRepository.find(filter);
    }
    async updateAll(bsas, where) {
        return this.bsasRepository.updateAll(bsas, where);
    }
    async findById(id, filter) {
        return this.bsasRepository.findById(id, filter);
    }
    async updateById(id, bsas) {
        await this.bsasRepository.updateById(id, bsas);
    }
    async replaceById(id, bsas) {
        await this.bsasRepository.replaceById(id, bsas);
    }
    async deleteById(id) {
        await this.bsasRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/bsas'),
    rest_1.response(200, {
        description: 'Bsas model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Bsas) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Bsas, {
                    title: 'NewBsas',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProvinceController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/bsas/count'),
    rest_1.response(200, {
        description: 'Bsas model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Bsas)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProvinceController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/bsas'),
    rest_1.response(200, {
        description: 'Array of Bsas model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Bsas, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Bsas)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProvinceController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/bsas'),
    rest_1.response(200, {
        description: 'Bsas PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Bsas, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Bsas)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Bsas, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProvinceController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/bsas/{id}'),
    rest_1.response(200, {
        description: 'Bsas model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Bsas, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Bsas, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProvinceController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/bsas/{id}'),
    rest_1.response(204, {
        description: 'Bsas PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Bsas, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Bsas]),
    tslib_1.__metadata("design:returntype", Promise)
], ProvinceController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/bsas/{id}'),
    rest_1.response(204, {
        description: 'Bsas PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Bsas]),
    tslib_1.__metadata("design:returntype", Promise)
], ProvinceController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/bsas/{id}'),
    rest_1.response(204, {
        description: 'Bsas DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProvinceController.prototype, "deleteById", null);
ProvinceController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BsasRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BsasRepository])
], ProvinceController);
exports.ProvinceController = ProvinceController;
//# sourceMappingURL=province.controller.js.map