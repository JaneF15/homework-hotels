import {SetMetadata} from "@nestjs/common";

export const ROLES_KEY = 'roles';

//создаем декоратор, который будем использовать для прикрепления метаданных (ROLES_KEY) к нужному методу
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);