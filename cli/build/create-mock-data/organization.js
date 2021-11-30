"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationCommand = void 0;
const faker_1 = __importDefault(require("faker"));
const commander_1 = require("commander");
const db_1 = require("../db");
const getRandomItem_1 = require("../helpers/getRandomItem");
const address = () => faker_1.default.fake("{{address.streetAddress}}\n{{address.zipCode}} {{address.state}}, {{address.country}}");
exports.organizationCommand = new commander_1.Command("organizations")
    .description("Add randomly generated organizations to the database")
    .alias("orgs")
    .option("-e, --editor", "Specify editor (user)", (x) => parseInt(x) || 1)
    .argument("[amount]", "The amount of organizations to generate, defaults to one", (x) => parseInt(x) || 1, 1)
    .action(async (amount) => {
    const { editor } = exports.organizationCommand.opts();
    const ids = await db_1.db.select("id").from("users").pluck("id");
    const organizations = Array(amount)
        .fill(undefined)
        .map(() => ({
        name: faker_1.default.company.companyName(),
        description: faker_1.default.commerce.productDescription(),
        homepage: faker_1.default.internet.url(),
        postal_address: address(),
        street_address: address(),
        editor_id: editor ?? (0, getRandomItem_1.getRandomItem)(ids),
    }));
    await db_1.db.batchInsert("organizations", organizations);
    console.info(`Generated ${amount} organization(s). One of them looks like this:`);
    console.info(organizations[0]);
});
