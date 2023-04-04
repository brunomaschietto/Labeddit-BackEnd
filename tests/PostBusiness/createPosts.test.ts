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
  test("Deve retornar a criação de um post", async () => {
    const input = { token: "token-mock-normal", content: "Hello World" };
    await postBusiness.createPost(input);
  });
  test("Deve retornar um erro se o token for inválido", () => {
    const input = { token: "token-mock-invalido", content: "Hello World" };
    return expect(postBusiness.createPost(input)).rejects.toThrow("Token inválido");
  });
});
