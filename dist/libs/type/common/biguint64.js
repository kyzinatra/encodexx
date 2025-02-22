"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biguint64 = void 0;
const custom_type_1 = require("../custom-type");
const test = new BigUint64Array(1);
exports.biguint64 = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readBigUint64();
    },
    encode(buffer, val) {
        buffer.writeBigUint64(val);
    },
    guard(data) {
        if (typeof data !== "bigint")
            return false;
        test[0] = data;
        return test[0] === data;
    },
    name: "biguint64",
});
