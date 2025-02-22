"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.none = void 0;
const custom_type_1 = require("../custom-type");
exports.none = (0, custom_type_1.customType)({
    decode() {
        return null;
    },
    encode() { },
    guard(data) {
        return data === null;
    },
    name: "null",
});
