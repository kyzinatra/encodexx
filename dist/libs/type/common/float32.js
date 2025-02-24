"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.float32 = void 0;
const custom_type_1 = require("../custom-type");
exports.float32 = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readFloat32();
    },
    encode(buffer, val) {
        buffer.writeFloat32(val);
    },
    guard(data) {
        return typeof data === "number";
    },
    name: "float32",
});
