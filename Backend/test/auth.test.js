import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Admin from "../Modal/Admin.modal.js";
import { adminlogin } from "../Controller/Admin.controller.js";
import { requireAdmin } from "../Middleware/auth.js";

const createResponse = () => ({
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
});

test("admin middleware requires a valid admin bearer token", () => {
    const priorSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = "test-only-secret";
    const call = (authorization) => {
        const req = { get: () => authorization };
        const res = {
            statusCode: 200,
            status(code) { this.statusCode = code; return this; },
            json(body) { this.body = body; return this; },
        };
        let nextCalled = false;
        requireAdmin(req, res, () => { nextCalled = true; });
        return { req, res, nextCalled };
    };

    try {
        assert.equal(call(undefined).res.statusCode, 401);
        assert.equal(call("Bearer invalid").res.statusCode, 401);
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { subject: "admin-id" });
        const result = call(`Bearer ${token}`);
        assert.equal(result.nextCalled, true);
        assert.deepEqual(result.req.admin, { id: "admin-id" });
    } finally {
        if (priorSecret === undefined) delete process.env.JWT_SECRET;
        else process.env.JWT_SECRET = priorSecret;
    }
});

test("admin login verifies the stored password and issues a middleware-valid token", async () => {
    const priorSecret = process.env.JWT_SECRET;
    const priorFindOne = Admin.findOne;
    const passwordHash = await bcryptjs.hash("correct-password", 4);
    process.env.JWT_SECRET = "test-only-secret";
    Admin.findOne = () => ({
        select: async () => ({ _id: "admin-test-id", password: passwordHash }),
    });
    const res = createResponse();

    try {
        await adminlogin({ body: { username: " site-admin ", password: "correct-password" } }, res);

        assert.equal(res.statusCode, 200);
        assert.equal(typeof res.body.token, "string");
        const claims = jwt.verify(res.body.token, process.env.JWT_SECRET);
        assert.equal(claims.role, "admin");
        assert.equal(claims.sub, "admin-test-id");
        assert.ok(claims.exp > claims.iat);
    } finally {
        Admin.findOne = priorFindOne;
        if (priorSecret === undefined) delete process.env.JWT_SECRET;
        else process.env.JWT_SECRET = priorSecret;
    }
});

test("admin login rejects an incorrect password without issuing a token", async () => {
    const priorSecret = process.env.JWT_SECRET;
    const priorFindOne = Admin.findOne;
    const passwordHash = await bcryptjs.hash("correct-password", 4);
    process.env.JWT_SECRET = "test-only-secret";
    Admin.findOne = () => ({
        select: async () => ({ _id: "admin-test-id", password: passwordHash }),
    });
    const res = createResponse();

    try {
        await adminlogin({ body: { username: "site-admin", password: "wrong-password" } }, res);

        assert.equal(res.statusCode, 401);
        assert.deepEqual(res.body, { message: "Invalid username or password" });
    } finally {
        Admin.findOne = priorFindOne;
        if (priorSecret === undefined) delete process.env.JWT_SECRET;
        else process.env.JWT_SECRET = priorSecret;
    }
});
