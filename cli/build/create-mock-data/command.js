"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockDataCommand = void 0;
const commander_1 = require("commander");
const organization_1 = require("./organization");
const user_1 = require("./user");
exports.createMockDataCommand = new commander_1.Command("create-mock-data").alias("cmd");
exports.createMockDataCommand.addCommand(user_1.userCommand);
exports.createMockDataCommand.addCommand(organization_1.organizationCommand);
