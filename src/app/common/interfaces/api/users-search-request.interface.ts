import { RoleEnum } from '@common/enums/role.enum';

export interface UsersSearchRequest {
  limit: number;
  offset: number;
  onlyMy?: boolean;
}
