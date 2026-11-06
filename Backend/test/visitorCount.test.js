import test from "node:test";
import assert from "node:assert/strict";
import VisitorCount from "../Modal/VisitorCount.modal.js";
import { getDailyVisitors, recordVisitor } from "../Controller/Visitor.controller.js";

const createResponse = () => ({
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
});

test("recordVisitor atomically increments the current UTC day's total", async () => {
    const originalFindOneAndUpdate = VisitorCount.findOneAndUpdate;
    let updateArguments;
    VisitorCount.findOneAndUpdate = async (...args) => { updateArguments = args; };
    const response = createResponse();

    try {
        await recordVisitor({}, response);

        assert.deepEqual(updateArguments[0], { date: new Date().toISOString().slice(0, 10) });
        assert.deepEqual(updateArguments[1], { $inc: { count: 1 } });
        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { recorded: true });
    } finally {
        VisitorCount.findOneAndUpdate = originalFindOneAndUpdate;
    }
});

test("getDailyVisitors returns the latest daily totals", async () => {
    const originalFind = VisitorCount.find;
    const expected = [{ date: new Date().toISOString().slice(0, 10), count: 3 }];
    let query;
    VisitorCount.find = (filter) => {
        query = filter;
        const cursor = {
            sort() { return this; },
            select() { return this; },
            lean: async () => expected,
        };
        return cursor;
    };
    const response = createResponse();

    try {
        await getDailyVisitors({}, response);

        assert.equal(query.date.$gte.length, 10);
        assert.deepEqual(response.body, { dailyVisitors: expected });
    } finally {
        VisitorCount.find = originalFind;
    }
});
