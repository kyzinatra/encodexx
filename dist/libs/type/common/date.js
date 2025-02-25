"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = void 0;
const custom_type_1 = require("../custom-type");
exports.date = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readDate();
    },
    encode(val, buffer) {
        buffer.writeDate(val);
    },
    guard(data) {
        return data instanceof Date;
    },
    name: "date",
});
