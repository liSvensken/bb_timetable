import { RoleEnum } from '@common/enums/role.enum';


export interface RegistrationRequestInterface {
  role: RoleEnum;
  nickname: string;
  email: string;
  password: string;
}
