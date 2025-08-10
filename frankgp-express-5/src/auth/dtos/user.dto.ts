// DTOs actualizados para reflejar las propiedades correctas

import { UserRoleEnum } from "../enum/roles.enum";

export class CreateUserDto {
  firstName: string;
  lastName?: string; // Opcional
  email: string;
  whatsapp?: string; // Opcional
  password: string; // Es importante incluir la contraseña para el registro
  image?: string; // Opcional
  role?: UserRoleEnum; // Opcional, default es UserRole.USER
}

export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  whatsapp?: string;
  image?: string;
  role?: UserRoleEnum; // Solo si es necesario actualizar el rol
  password?: string; // Opcional, solo se debe enviar si se quiere cambiar la contraseña
}
