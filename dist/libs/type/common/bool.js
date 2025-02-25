"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bool = void 0;
const custom_type_1 = require("../custom-type");
exports.bool = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readBoolean();
    },
    encode(val, buffer) {
        buffer.writeBoolean(val);
    },
    guard(data) {
        return typeof data === "boolean";
    },
    name: "boolean",
});
