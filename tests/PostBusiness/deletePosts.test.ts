import { PostBusiness } from "../../src/business/PostBusiness";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";

describe("posts", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );
  test("Deve deletar um Post pelo ID", async () => {
    const input = {
      idToDelete: "p001",
      token: "token-mock-normal",
    };
    await postBusiness.deletePost(input);
  });
  test("Deve retornar um erro se o token for inválido", () => {
    const input = {
      idToDelete: "p001",
      token: undefined
    };
    return expect(postBusiness.deletePost(input)).rejects.toThrow(
      "'token' ausente"
    );
  });
});
