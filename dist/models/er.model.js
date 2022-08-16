"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Er = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Er = class Er extends repository_1.Entity {
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
], Er.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Er.prototype, "city", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Er.prototype, "date", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'any',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Er.prototype, "weather", void 0);
Er = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Er);
exports.Er = Er;
//# sourceMappingURL=er.model.js.map