import { ServiceModel } from '@common/interfaces/models/service.model';
import { CommonResponse } from '@common/interfaces/api/common-response';

export interface GetServicesResponse extends CommonResponse<ServiceModel[]> {
}
