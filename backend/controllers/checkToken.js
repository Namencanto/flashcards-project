import jwt from "jsonwebtoken";
export function checkToken(req, res, next) {
  const token = req.cookies.jwt || req.headers.jwt; // second is for test purposes
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    next(userInfo);
  });
}
