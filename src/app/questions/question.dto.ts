export class CreateQuestionDto {
  text: string;
  testID: string;
  weight?: number;
  options: {
    label: string;
    value: string;
  }[];
  correctLabel: string;
}

export class UpdateQuestionDto {
  text?: string;
  weight?: number;
  correctLabel?: string;
}

export class UpdateOptionDto {
  label: string;
  value: string;
}
