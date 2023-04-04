import { PostBusiness } from "../../src/business/PostBusiness";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";

describe("Posts", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );
  test("Deve atualizar um post pelo ID", async () => {
    const input = {
      idToEdit: "p001",
      token: "token-mock-normal",
      content: "publicacao-atualizada",
    };
    await postBusiness.editPost(input);
  });
  test("Deve retornar um erro se o token for inválido", async () => {
    const input = {
      idToEdit: "p001",
      token: undefined,
      content: "publicacao-atualizada",
    };
    await expect(async () => {
      await postBusiness.editPost(input);
    }).rejects.toThrow("'token' ausente");
  });
});
