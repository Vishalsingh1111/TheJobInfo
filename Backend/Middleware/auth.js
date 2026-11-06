import jwt from "jsonwebtoken";

export function requireAdmin(req, res, next) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(503).json({ error: "Admin authentication is not configured" });
    }

    const authorization = req.get("authorization") || "";
    const [scheme, token] = authorization.split(" ");
    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    try {
        const claims = jwt.verify(token, secret);
        if (claims?.role !== "admin" || !claims?.sub) {
            return res.status(401).json({ error: "Invalid authentication token" });
        }
        req.admin = { id: claims.sub };
        return next();
    } catch {
        return res.status(401).json({ error: "Invalid or expired authentication token" });
    }
}
