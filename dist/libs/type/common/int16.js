"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.int16 = void 0;
const custom_type_1 = require("../custom-type");
const test = new Int16Array(1);
exports.int16 = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readInt16();
    },
    encode(val, buffer) {
        buffer.writeInt16(val);
    },
    guard(data) {
        if (typeof data !== "number")
            return false;
        test[0] = data;
        return test[0] === data;
    },
    name: "int16",
});
