export interface IPhoneService {
  init: () => void;
  stop: () => void;
  answer: (username: string) => Promise<boolean>;
}
