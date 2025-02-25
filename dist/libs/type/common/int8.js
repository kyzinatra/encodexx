"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.int8 = void 0;
const custom_type_1 = require("../custom-type");
const test = new Int8Array(1);
exports.int8 = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readInt8();
    },
    encode(val, buffer) {
        buffer.writeInt8(val);
    },
    guard(data) {
        if (typeof data !== "number")
            return false;
        test[0] = data;
        return test[0] === data;
    },
    name: "int8",
});
