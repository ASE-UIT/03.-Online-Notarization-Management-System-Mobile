export type IGetNotarizationServicesByFieldIdResponse = INotarizationService[];

export type IGetAllNotarrizationServicesResponse = INotarizationService[];

export type IGetNotarizationServicesByFieldIdRequest = string;

export interface INotarizationService {
  id: string;
  name: string;
  fieldId: string;
  description: string;
  price: number;
  code: string;
  required_documents: string[];
}
