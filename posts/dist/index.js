"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
// app.use(express.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const posts = {};
app.get('/posts', (res, req) => {
    res.send(posts);
});
app.post('/posts', (res, req) => {
    const id = (0, crypto_1.randomBytes)(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    res.status(201).send(posts[id]);
});
app.listen(3001, () => {
    console.log('Posts running on 3001');
});
exports.default = app;
