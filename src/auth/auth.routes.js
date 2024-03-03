import { Router } from "express";
import { check } from "express-validator";

import {
    login
} from "./auth.controller.js";

import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.post(
    "/loginEmail",
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password is mandatory').not().isEmpty(),
        validateFields,
    ], login);

router.post(
    "/loginUsername",
    [
        check('username', 'Username cannot be empty').not().isEmpty(),
        check('password', 'The password is mandatory').not().isEmpty(),
        validateFields,
    ], login)

export default router;