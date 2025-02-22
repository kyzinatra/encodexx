"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.int32 = void 0;
const custom_type_1 = require("../custom-type");
const test = new Int32Array(1);
exports.int32 = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readInt32();
    },
    encode(buffer, val) {
        buffer.writeInt32(val);
    },
    guard(data) {
        if (typeof data !== "number")
            return false;
        test[0] = data;
        return test[0] === data;
    },
    name: "int32",
});
