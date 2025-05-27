export interface ISignatoryResponseDTO {
  authority: string;
  currentSignatory: boolean;
  date_and_time_of_signature: string;
  name: string;
  signature: string;
  signed: boolean;
}
