import { BloodType } from '@prisma/client';

enum Gender {
  LK = 'LK',
  PR = 'PR',
}

enum Major {
  TKJ = 'TKJ',
  RPL = 'RPL',
}

enum Religion {
  ISLAM = 'ISLAM',
  CHRISTIAN = 'CHRISTIAN',
  CATHOLIC = 'CATHOLIC',
  HINDU = 'HINDU',
  BUDDHIST = 'BUDDHIST',
  CONFUCIAN = 'CONFUCIAN',
}

enum AcademyStatus {
  ACTIVE = 'ACTIVE',
  NONACTIVE = 'NONACTIVE',
}

enum OrphanStatus {
  NONE = 'NONE',
  YATIM = 'YATIM',
  PIATU = 'PIATU',
  YATIMPIATU = 'YATIMPIATU',
}

enum ParentStatus {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
}

enum Blood_type {
  A,
  B,
  AB,
  O,
}

export class CreateStudentDto {
  NISN: string;
  NIK: string;
  fullName: string;
  placeOfBirth: string;
  dateOfBirth: Date | string;
  gender: Gender;
  address: string;
  phone: string;
  major: Major;
  dateIn?: Date;
  picture_url?: string;
  religion?: Religion;
  status?: AcademyStatus; // Sesuaikan enum `AcademyStatus`
  orphanStatus?: OrphanStatus;
  child_number?: number;
  Brothers?: number;
  from_school?: string;
  citizenship?: string;
  blood_type?: BloodType;
  motherID?: string;
  fatherID?: string;
}
