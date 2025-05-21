// create-father.dto.ts
export class CreateFatherDto {
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
    | 'OTHER'; // Sesuaikan enum
  placeOfBirth: string;
  dateOfBirth: Date | string;
  status?: 'ALIVE' | 'DECEASED' | 'UNKNOWN'; // Sesuaikan enum ParentStatus
  education: string;
  title: string;
  citizenship?: string;
  studentID: string;
}