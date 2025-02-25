"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str = void 0;
const custom_type_1 = require("../custom-type");
exports.str = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readString();
    },
    encode(val, buffer) {
        buffer.writeString(val);
    },
    guard(data) {
        return typeof data === "string";
    },
    name: "str",
});
