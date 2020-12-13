import { CommonResponse } from '@common/interfaces/api/common-response';
import { RoleEnum } from '@common/enums/role.enum';


interface Result {
  id: number;
  role: RoleEnum;
  nickname: string;
}

export interface RegistrationResponse extends CommonResponse<Result> {
}
