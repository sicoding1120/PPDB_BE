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

interface Student {
  id?: string;
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
  picture_url?: string | null;
  religion?: Religion | null;
  status: AcademyStatus;
  createdAt?: Date;
  orphanStatus: OrphanStatus;
  parentID?: string | null;
}
