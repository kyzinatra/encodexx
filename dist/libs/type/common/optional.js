"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional = optional;
const custom_type_1 = require("../custom-type");
const or_1 = require("./or");
const undef_1 = require("./undef");
function optional(type) {
    if (custom_type_1.TYPE_SYMBOL in type) {
        return (0, or_1.or)(type, undef_1.undef);
    }
    return {
        data: type,
        [custom_type_1.OPTIONAL_SYMBOL]: true,
    };
}
