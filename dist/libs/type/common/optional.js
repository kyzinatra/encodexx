"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional = optional;
const or_1 = require("./or");
const undef_1 = require("./undef");
function optional(type) {
    return (0, or_1.or)(type, undef_1.undef);
}
