"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDBConnection = exports.db = void 0;
const knex_1 = __importDefault(require("knex"));
const config = require("../../knexfile");
exports.db = (0, knex_1.default)({
    ...config,
});
const testDBConnection = () => exports.db.raw("select 1+1 as result");
exports.testDBConnection = testDBConnection;
