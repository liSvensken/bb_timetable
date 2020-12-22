import { UserModel } from '@common/interfaces/models/user.model';
import { CommonResponse } from '@common/interfaces/api/common-response';

export interface GetUserResponse extends CommonResponse<UserModel> {
}
