import { CommonResponse } from '@common/interfaces/api/common-response';


interface Result {
  affectedRows: number;
  changedRows: number;
  fieldCount: number;
  insertId: number;
  message: string;
  protocol41: boolean;
  serverStatus: number;
  warningCount: number;
}

export interface RegistrationResponse extends CommonResponse<Result> {
}
