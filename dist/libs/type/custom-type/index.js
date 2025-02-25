"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPE_SYMBOL = void 0;
exports.customType = customType;
exports.TYPE_SYMBOL = Symbol("custom-type-symbol");
function customType(t) {
    return { ...t, [exports.TYPE_SYMBOL]: true };
}
