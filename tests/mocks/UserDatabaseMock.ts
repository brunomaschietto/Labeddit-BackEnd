import { BaseDatabase } from "../../src/database/BaseDataBase";
import { UserDB, USER_ROLES } from "../../src/interfaces/types";

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users";

  public insert = async (userDB: UserDB): Promise<void> => {
    // não precisa retornar nada, porque é void
  };

  public findByEmail = async (email: string): Promise<UserDB | undefined> => {
    switch (email) {
      case "normal@email.com":
        return {
          id: "id-mock-normal",
          name: "Normal Mock",
          email: "normal@email.com",
          password: "hash-bananinha",
          created_at: new Date().toISOString(),
          role: USER_ROLES.NORMAL,
        };
      case "admin@email.com":
        return {
          id: "id-mock-admin",
          name: "Admin Mock",
          email: "admin@email.com",
          password: "hash-bananinha",
          created_at: new Date().toISOString(),
          role: USER_ROLES.ADMIN,
        };
      default:
        return undefined;
    }
  };
}
