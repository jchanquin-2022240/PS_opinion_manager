import { Router } from "express";
import { check } from "express-validator";

import {
    userPost,
    putUser
} from "./user.controller.js";

import { validateFields } from "../middlewares/validate-fields.js";
import { existingEmail, existingUsername, existUserById } from "../helpers/db-validators.js";
import { validateJWT } from "../middlewares/validate-jwt.js";


const router = Router();

router.post(
    "/",
    [
        check('username', "Username cannot be empty").not().isEmpty(),
        check('username').custom(existingUsername),
        check('email', "Email cannot be empty").isEmail(),
        check('email').custom(existingEmail),
        check('password', "password must be greater than 8 character").isLength({min: 8}),
        validateFields,
    ], userPost);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existUserById),
        validateFields
    ], putUser);

export default router;