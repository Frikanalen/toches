"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCommand = void 0;
const commander_1 = require("commander");
const faker_1 = __importDefault(require("faker"));
const db_1 = require("../db");
exports.userCommand = new commander_1.Command("users")
    .description("Add randomly generated users to the database")
    .argument("[amount]", "The amount of users to generate, defaults to one", (x) => parseInt(x) || 1, 1)
    .action(async (amount) => {
    const users = Array(amount)
        .fill(undefined)
        .map(() => ({
        email: faker_1.default.internet.email(),
        password: "TEST_USER_PASSWORD",
        first_name: faker_1.default.name.firstName(),
        last_name: faker_1.default.name.lastName(),
    }));
    await db_1.db.batchInsert("users", users);
    console.info(`Generated ${amount} user(s). One of them looks like this:`);
    console.info(users[0]);
});
