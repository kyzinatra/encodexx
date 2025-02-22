"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutOfRangeError = void 0;
class OutOfRangeError extends RangeError {
    constructor(type, val) {
        super(`Out of range: ${type} type cannot be assigned to the number ${val}`);
    }
}
exports.OutOfRangeError = OutOfRangeError;
