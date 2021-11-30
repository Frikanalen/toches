"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomItem = void 0;
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
exports.getRandomItem = getRandomItem;
