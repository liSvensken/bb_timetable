import { CommonResponse } from '@common/interfaces/api/common-response';
import { UserModel } from '@common/interfaces/models/user.model';

export interface AuthApiLoginResponse extends CommonResponse<UserModel>{
}
