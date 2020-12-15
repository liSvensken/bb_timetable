import { CommonResponse } from '@common/interfaces/api/common-response';
import { CityModel } from '@common/interfaces/models/city.model';

export interface GetCitiesResponse extends CommonResponse<CityModel[]> {
}
