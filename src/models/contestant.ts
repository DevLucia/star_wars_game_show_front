import { Character } from './character';

export class Contestant {
  constructor(
    public name: string,
    public last_name: string,
    public birth_date: string,
    public phone: string,
    public country: string,
    public email: string,
    public character: string
  ){}
}