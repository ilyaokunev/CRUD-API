import { IUser } from "./user.js";

export interface IRequestUserDto {
  username: string,
  age: number,
  hobbies: string[],
}
export type IResponseUserDto = IUser