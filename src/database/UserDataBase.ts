import { UserDB } from "../interfaces/types";
import { BaseDatabase } from "./BaseDataBase";

export class UserDataBase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public insert = async (userDB: UserDB): Promise<void> => {
    await BaseDatabase.connection(UserDataBase.TABLE_USERS).insert(userDB);
  };

  public findByEmail = async (email: string): Promise<UserDB | undefined> => {
    const result: UserDB[] = await BaseDatabase.connection(
      UserDataBase.TABLE_USERS
    )
      .select()
      .where({ email });
    return result[0];
  };
}
