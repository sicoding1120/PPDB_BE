// create-mother.dto.ts
export class CreateMotherDto {
  name: string;
  job?: string;
  phone?: string;
  address?: string;
  religion?:
    | 'ISLAM'
    | 'CHRISTIAN'
    | 'CATHOLIC'
    | 'HINDU'
    | 'BUDDHIST'
    
  placeOfBirth: string;
  dateOfBirth: Date;
  status?: 'ALIVE' | 'DEAD' 
  education: string;
  title: string;
  citizenship?: string;
  studentID: string;
}
