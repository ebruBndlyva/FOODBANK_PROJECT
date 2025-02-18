import jwt from "jsonwebtoken";

export const AuthTokenMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authentication token is required",
      });
    }  

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode
    req.body.email = decode.email;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Invalid or expired auth token",
      error,
    });
  }
};
