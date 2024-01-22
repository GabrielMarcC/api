"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var import_express3 = __toESM(require("express"));
var import_dotenv3 = require("dotenv");

// src/modules/user/user-routes.ts
var import_express = require("express");

// src/modules/user/user-controller.ts
var import_bcrypt = require("bcrypt");

// src/modules/user/user-schema.ts
var import_mongoose = __toESM(require("mongoose"));
var Schema = new import_mongoose.default.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
var user_schema_default = import_mongoose.default.model("user", Schema);

// src/modules/user/user-service.ts
var UserService = class {
  static save(user) {
    return __async(this, null, function* () {
      const savedUser = new user_schema_default(user);
      console.log(user);
      yield savedUser.save();
    });
  }
  static findByEmail(email) {
    return __async(this, null, function* () {
      const user = yield user_schema_default.find({ email });
      if (user !== null)
        return user[0];
      return null;
    });
  }
};

// src/modules/user/user-controller.ts
var UserController = class {
  static create(req, res) {
    return __async(this, null, function* () {
      const user = req.body;
      yield UserService.save({
        email: user.email,
        password: yield (0, import_bcrypt.hash)(user.password, 10)
      });
      res.json({ message: "created" });
    });
  }
};

// src/modules/user/user-routes.ts
var router = (0, import_express.Router)();
router.post("/user", UserController.create);

// src/modules/auth/auth-routes.ts
var import_express2 = require("express");

// src/modules/auth/auth-controller.ts
var import_bcrypt2 = require("bcrypt");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var Auth = class _Auth {
  static login(req, res) {
    return __async(this, null, function* () {
      const user = yield UserService.findByEmail(req.body.email);
      if (!user) {
        return res.json({ message: "invalid credentials" });
      }
      const match = yield _Auth.compare(req.body.password, user.password);
      if (!match)
        return res.json({ message: "invalid credentials" });
      const token = yield _Auth.createJwt({ user_id: user.id });
      res.json({ acess_Token: token });
    });
  }
  static compare(data, database) {
    return __async(this, null, function* () {
      return yield (0, import_bcrypt2.compare)(data, database);
    });
  }
  static createJwt(payload) {
    return __async(this, null, function* () {
      var _a;
      return import_jsonwebtoken.default.sign(payload, (_a = process.env.JWT_SECRET) != null ? _a : "", {
        expiresIn: "1h"
      });
    });
  }
};

// src/modules/auth/auth-routes.ts
var authRoutes = (0, import_express2.Router)();
authRoutes.post("/auth", Auth.login);

// src/database/connection.ts
var import_mongoose2 = require("mongoose");
var import_dotenv2 = require("dotenv");
(0, import_dotenv2.config)();
var createDBConnection = () => __async(void 0, null, function* () {
  var _a;
  try {
    yield (0, import_mongoose2.connect)((_a = process.env.URI) != null ? _a : "");
    console.log("connected to DB");
  } catch (error) {
    throw new Error(error.message);
  }
});

// src/index.ts
(0, import_dotenv3.config)();
var app = (0, import_express3.default)();
createDBConnection().then(() => console.log("sucess")).catch((err) => console.log(err.message));
app.use(import_express3.default.json());
app.use(router);
app.use(authRoutes);
app.get("/", (req, res) => {
  res.status(200).send("ok");
});
app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
