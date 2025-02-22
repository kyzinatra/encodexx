"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uint16 = void 0;
const custom_type_1 = require("../custom-type");
const test = new Uint16Array(1);
exports.uint16 = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readUint16();
    },
    encode(buffer, val) {
        buffer.writeUint16(val);
    },
    guard(data) {
        if (typeof data !== "number")
            return false;
        test[0] = data;
        return test[0] === data;
    },
    name: "uint16",
});
