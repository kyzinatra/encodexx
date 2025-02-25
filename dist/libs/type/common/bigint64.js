"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigint64 = void 0;
const custom_type_1 = require("../custom-type");
const test = new BigInt64Array(1);
exports.bigint64 = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readBigInt64();
    },
    encode(val, buffer) {
        buffer.writeBigInt64(val);
    },
    guard(data) {
        if (typeof data !== "bigint")
            return false;
        test[0] = data;
        return test[0] === data;
    },
    name: "bigint64",
});
