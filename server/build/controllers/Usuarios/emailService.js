"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_config_1 = __importDefault(require("./nodemailer.config"));
const tokenService_1 = require("./tokenService");
const sendVerificationEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, tokenService_1.generateToken)(email);
    const verificationLink = `http://localhost:5000/api/usuario/verify/${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verifica tu cuenta de RibbitDary',
        html: `
      <h1>Verificación de cuenta</h1>
      <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
      <a href="${verificationLink}">Verificar Cuenta</a>
    `
    };
    try {
        yield nodemailer_config_1.default.sendMail(mailOptions);
        console.log('Correo de verificación enviado a', email);
    }
    catch (error) {
        console.error('Error enviando el correo de verificación', error);
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
