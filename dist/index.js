"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customType = exports.t = exports.Serializer = void 0;
const serializer_1 = require("./libs/serializer");
var serializer_2 = require("./libs/serializer");
Object.defineProperty(exports, "Serializer", { enumerable: true, get: function () { return serializer_2.Serializer; } });
var common_1 = require("./libs/type/common");
Object.defineProperty(exports, "t", { enumerable: true, get: function () { return common_1.t; } });
var custom_type_1 = require("./libs/type/custom-type");
Object.defineProperty(exports, "customType", { enumerable: true, get: function () { return custom_type_1.customType; } });
const schema1 = {};
const schema2 = {};
console.log(serializer_1.Serializer.equal(schema1, schema2));
