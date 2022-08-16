"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbaRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let CbaRepository = class CbaRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Cba, dataSource);
    }
};
CbaRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.MongoDB')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDbDataSource])
], CbaRepository);
exports.CbaRepository = CbaRepository;
//# sourceMappingURL=cba.repository.js.map