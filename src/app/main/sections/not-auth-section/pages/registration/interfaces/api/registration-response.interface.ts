import { CommonResponse } from '@common/interfaces/api/common-response';
import { RoleEnum } from '@common/enums/role.enum';
import { UserModel } from '@common/interfaces/models/user.model';

export interface RegistrationResponse extends CommonResponse<UserModel> {
}
