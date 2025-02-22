"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutdatedError = void 0;
class OutdatedError extends Error {
    constructor(v1, v2) {
        super(`Buffer is outdated. Version ${v1} not equal ${v2}`);
    }
}
exports.OutdatedError = OutdatedError;
