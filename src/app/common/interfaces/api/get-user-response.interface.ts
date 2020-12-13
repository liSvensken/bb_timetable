import { CommonResponse } from '@common/interfaces/api/common-response';
import { UserModelInterface } from '@common/interfaces/models/user.model';

export interface GetUserResponse extends CommonResponse<UserModelInterface[]> {
}
