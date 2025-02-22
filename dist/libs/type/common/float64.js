"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.float64 = void 0;
const custom_type_1 = require("../custom-type");
exports.float64 = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readFloat64();
    },
    encode(buffer, val) {
        buffer.writeFloat64(val);
    },
    guard(data) {
        return typeof data === "number";
    },
    name: "float64",
});
