"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uint32 = void 0;
const custom_type_1 = require("../custom-type");
const test = new Uint16Array(1);
exports.uint32 = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readUint32();
    },
    encode(buffer, val) {
        buffer.writeUint32(val);
    },
    guard(data) {
        if (typeof data !== "number")
            return false;
        test[0] = data;
        return test[0] === data;
    },
    name: "uint32",
});
