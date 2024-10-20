import { IUser } from "interfaces/user.js";
import {v4 as uuid} from "uuid";

class Db {

  db: Map<string, IUser>

constructor(startUsers?: IUser[]) {
  this.db = new Map();
  if (startUsers) {
    startUsers.forEach(user => this.db.set(user.id,user))
  }
}

public createUser(user: Omit<IUser, 'id'>) {
  const id = uuid();
  const userForSave = {...user, id} as IUser
  this._setUser(userForSave)
}

public getAllUsers() {
  const allUsers = Array.from(this.db.values());
  return Promise.resolve(allUsers);
}

public getUser(id: string) {
  if (id && this.db.has(id)) {
    return Promise.resolve(this.db.get(id));
  } else {
    return Promise.resolve(null);
  }
}

private _setUser(user: IUser) {
  this.db.set(user.id, user);
}

}

const startData:IUser[] = [
  {
    id: 'acd3a8e1-6ac8-4721-9d62-5f1837e975e3',
    username: 'Kat',
    hobbies: ['beer', 'vodka'],
    age: 12,
  }
]

export default new Db(startData);