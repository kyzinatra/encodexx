"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.undef = void 0;
const custom_type_1 = require("../custom-type");
exports.undef = (0, custom_type_1.customType)({
    decode() {
        return undefined;
    },
    encode() { },
    guard(data) {
        return data === undefined;
    },
    name: "undef",
});
