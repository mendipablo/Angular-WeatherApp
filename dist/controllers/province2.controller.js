"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Province2Controller = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let Province2Controller = class Province2Controller {
    constructor(cbaRepository) {
        this.cbaRepository = cbaRepository;
    }
    async create(cba) {
        return this.cbaRepository.create(cba);
    }
    async count(where) {
        return this.cbaRepository.count(where);
    }
    async find(filter) {
        return this.cbaRepository.find(filter);
    }
    async updateAll(cba, where) {
        return this.cbaRepository.updateAll(cba, where);
    }
    async findById(id, filter) {
        return this.cbaRepository.findById(id, filter);
    }
    async updateById(id, cba) {
        await this.cbaRepository.updateById(id, cba);
    }
    async replaceById(id, cba) {
        await this.cbaRepository.replaceById(id, cba);
    }
    async deleteById(id) {
        await this.cbaRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/cba'),
    rest_1.response(200, {
        description: 'Cba model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Cba) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Cba, {
                    title: 'NewCba',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Province2Controller.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/cba/count'),
    rest_1.response(200, {
        description: 'Cba model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Cba)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Province2Controller.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/cba'),
    rest_1.response(200, {
        description: 'Array of Cba model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Cba, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Cba)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Province2Controller.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/cba'),
    rest_1.response(200, {
        description: 'Cba PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Cba, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Cba)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Cba, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Province2Controller.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/cba/{id}'),
    rest_1.response(200, {
        description: 'Cba model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Cba, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Cba, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Province2Controller.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/cba/{id}'),
    rest_1.response(204, {
        description: 'Cba PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Cba, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Cba]),
    tslib_1.__metadata("design:returntype", Promise)
], Province2Controller.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/cba/{id}'),
    rest_1.response(204, {
        description: 'Cba PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Cba]),
    tslib_1.__metadata("design:returntype", Promise)
], Province2Controller.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/cba/{id}'),
    rest_1.response(204, {
        description: 'Cba DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], Province2Controller.prototype, "deleteById", null);
Province2Controller = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.CbaRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CbaRepository])
], Province2Controller);
exports.Province2Controller = Province2Controller;
//# sourceMappingURL=province2.controller.js.map