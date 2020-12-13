import { RoleEnum } from '@common/enums/role.enum';
import { CommonResponse } from '@common/interfaces/api/common-response';


interface Result {
  id: number;
  role: RoleEnum;
  nickname: string;
}

export interface AuthorizationResponse extends CommonResponse<Result>{
}
