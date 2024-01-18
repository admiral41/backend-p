const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({
      success: false,
      message: "Authorization header is missing",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.json({
      success: false,
      message: "Token is missing",
    });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Token is invalid",
    });
  }
};

const authGuardAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({
      success: false,
      message: "Authorization header is missing",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.json({
      success: false,
      message: "Token is missing",
    });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData;
    if (!req.user.isAdmin) {
      return res.json({
        success: false,
        message: "Denied permission",
      });
    }
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Token is invalid",
    });
  }
};

module.exports = {
  authGuard,
  authGuardAdmin,
};
