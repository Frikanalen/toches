"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const command_1 = require("./create-mock-data/command");
const db_1 = require("./db");
commander_1.program.addCommand(command_1.createMockDataCommand);
commander_1.program.hook("preAction", async () => {
    console.info(`Testing DB connection...`);
    await (0, db_1.testDBConnection)();
});
commander_1.program.hook("postAction", () => process.exit(0));
commander_1.program.parse(process.argv);
