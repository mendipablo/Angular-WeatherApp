"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Province3Controller = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let Province3Controller = class Province3Controller {
    constructor(erRepository) {
        this.erRepository = erRepository;
    }
    async create(er) {
        return this.erRepository.create(er);
    }
    async count(where) {
        return this.erRepository.count(where);
    }
    async find(filter) {
        return this.erRepository.find(filter);
    }
    async updateAll(er, where) {
        return this.erRepository.updateAll(er, where);
    }
    async findById(id, filter) {
        return this.erRepository.findById(id, filter);
    }
    async updateById(id, er) {
        await this.erRepository.updateById(id, er);
    }
    async replaceById(id, er) {
        await this.erRepository.replaceById(id, er);
    }
    async deleteById(id) {
        await this.erRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/er'),
    rest_1.response(200, {
        description: 'Er model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Er) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Er, {
                    title: 'NewEr',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Province3Controller.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/er/count'),
    rest_1.response(200, {
        description: 'Er model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Er)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Province3Controller.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/er'),
    rest_1.response(200, {
        description: 'Array of Er model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Er, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Er)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Province3Controller.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/er'),
    rest_1.response(200, {
        description: 'Er PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Er, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Er)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Er, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Province3Controller.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/er/{id}'),
    rest_1.response(200, {
        description: 'Er model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Er, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Er, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Province3Controller.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/er/{id}'),
    rest_1.response(204, {
        description: 'Er PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Er, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Er]),
    tslib_1.__metadata("design:returntype", Promise)
], Province3Controller.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/er/{id}'),
    rest_1.response(204, {
        description: 'Er PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Er]),
    tslib_1.__metadata("design:returntype", Promise)
], Province3Controller.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/er/{id}'),
    rest_1.response(204, {
        description: 'Er DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], Province3Controller.prototype, "deleteById", null);
Province3Controller = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ErRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ErRepository])
], Province3Controller);
exports.Province3Controller = Province3Controller;
//# sourceMappingURL=province3.controller.js.map