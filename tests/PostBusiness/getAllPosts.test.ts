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

  test("Deve retornar os posts com os criadores", async () => {
    const input = { query: "", token: "token-mock-normal" };
    const expected = {
      id: "p001",
      creator: {
        id: "id-mock",
        name: "nome-criador"
      },
      content: "publicacao1",
      comments: 0,
      likes: 1,
      dislikes: 1,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    };
    const response = await postBusiness.getAllPosts(input);
    expect(response).toHaveLength(2);
    expect(response).toEqual(expect.arrayContaining([expected]));
  });

  test("Deve retornar um erro se o token for inválido", async () => {
    const input = { query: "", token: "token-mock-invalido" };
    await expect(async () => {
      await postBusiness.getAllPosts(input);
    }).rejects.toThrow("Token inválido");
  });
});
