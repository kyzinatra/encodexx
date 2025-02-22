"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeMatchError = void 0;
class TypeMatchError extends TypeError {
    constructor(msg = "") {
        super(`The provided type does not match the given value. ${msg}`);
    }
}
exports.TypeMatchError = TypeMatchError;
