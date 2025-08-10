"use strict";
// DTOs actualizados para reflejar las propiedades correctas
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = exports.CreateUserDto = void 0;
class CreateUserDto {
    firstName;
    lastName; // Opcional
    email;
    whatsapp; // Opcional
    password; // Es importante incluir la contraseña para el registro
    image; // Opcional
    role; // Opcional, default es UserRole.USER
}
exports.CreateUserDto = CreateUserDto;
class UpdateUserDto {
    firstName;
    lastName;
    email;
    whatsapp;
    image;
    role; // Solo si es necesario actualizar el rol
    password; // Opcional, solo se debe enviar si se quiere cambiar la contraseña
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=user.dto.js.map