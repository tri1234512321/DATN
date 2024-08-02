/** @format */

// /** @format */

// const { sign, verify } = require("jsonwebtoken");

// const KEY = "supersecret123";

// export function createJSONToken(id) {
//       return sign({ id }, KEY, { expiresIn: "1d" });
// }

// export function validateJSONToken(token) {
//       return verify(token, KEY);
// }
// export function parseJwt(token) {
//       return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
// }
// export function checkAuthMiddleware(req, res, next) {
//       if (req.method === "OPTIONS") {
//             return next();
//       }
//       if (!req.headers.authorization) {
//             console.log("NOT AUTH. AUTH HEADER MISSING.");
//             return res.status(401).json({ msg: "Not authenticated." });
//       }
//       const authFragments = req.headers.authorization.split(" ");

//       if (authFragments.length !== 2) {
//             console.log("NOT AUTH. AUTH HEADER INVALID.");
//             return res.status(401).json({ msg: "Not authenticated." });
//       }
//       const authToken = authFragments[1];
//       try {
//             const validatedToken = validateJSONToken(authToken);
//             req.token = validatedToken;
//       } catch (error) {
//             console.log("NOT AUTH. TOKEN INVALID.");
//             return res.status(401).json({ msg: "Not authenticated." });
//       }
//       next();
// }

// export function checkAuthAdminMiddleware(req, res, next) {
//       if (req.method === "OPTIONS") {
//             return next();
//       }
//       if (!req.headers.authorization) {
//             console.log("NOT AUTH. AUTH HEADER MISSING.");
//             return res.status(401).json({ msg: "Not authenticated." });
//       }
//       const authFragments = req.headers.authorization.split(" ");
//       console.log(parseJwt(authFragments[1]));
//       if (authFragments.length !== 2) {
//             console.log("NOT AUTH. AUTH HEADER INVALID.");
//             return res.status(401).json({ msg: "Not authenticated." });
//       }
//       const authToken = authFragments[1];
//       try {
//             const validatedToken = validateJSONToken(authToken);
//             req.token = validatedToken;
//       } catch (error) {
//             console.log("NOT AUTH. TOKEN INVALID.");
//             return res.status(401).json({ msg: "Not authenticated." });
//       }
//       next();
// }
