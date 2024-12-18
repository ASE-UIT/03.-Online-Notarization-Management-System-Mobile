export type IGetAllNotarizationFieldResponse = INotarizationField[];

export type IGetNotarizationFieldByIdResponse = INotarizationField;

export interface INotarizationField {
  id: string;
  name: string;
  description: string;
  name_en: string;
  code: string;
}
