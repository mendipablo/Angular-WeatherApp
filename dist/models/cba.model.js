"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cba = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Cba = class Cba extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Cba.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Cba.prototype, "city", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Cba.prototype, "date", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'any',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Cba.prototype, "weather", void 0);
Cba = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Cba);
exports.Cba = Cba;
//# sourceMappingURL=cba.model.js.map