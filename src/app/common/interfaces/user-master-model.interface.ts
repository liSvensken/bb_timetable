export interface Service {
  serviceId: number;
  name: string;
}

export interface InfoService {
  infoServiceId: number;
  text: string;
}

export interface City {
  cityId: number;
  service: number;
  name: string;
}

export interface PhotoGallery {
  idPhotoGallery: number;
  service: number;
  photo: string;
}

export interface UserMasterModelInterface {
  id: number;
  role: string;
  name: string;
  email: string;
  services?: Service[]; // ссылка на services (id, name)
  city?: City; // ссылка на city (id, name)
  photo?: string;
  phone?: string;
  gender?: string;
  birthday?: string;
  infoYourself?: string;
  infoServices?: InfoService[]; // ссылка на инфоСервисез (id, crater, service, text)
  photosGallery?: PhotoGallery[]; // ссылка на ФотозГалереи (id, crater, service, photo)
  // receptions?: string; // todo
}
