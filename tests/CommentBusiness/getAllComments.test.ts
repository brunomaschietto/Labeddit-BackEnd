import { CommentBusiness } from "../../src/business/CommentBusiness";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";

describe("Buscar todos os comentários", () => {
  const commentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("Deve retornar os comentários com os criadores", async () => {
    const input = { id: "p001", query: "", token: "token-mock-normal" };
    const expected = {
      id: "c001",
      creator: {
        id: "id-mock",
        name: "nome-criador",
      },
      postId: "p001",
      content: "publicacao1",
      likes: 1,
      dislikes: 1,
      createdAt: expect.any(String),
    };
    const response = await commentBusiness.getAllComments(input);
    expect(response).toHaveLength(2);
    expect(response).toEqual(expect.arrayContaining([expected]));
  });
  test("Deve retornar um erro caso o Token esteja ausente", async () => {
    const input = { id: "p001", query: "", token: undefined };

    return expect(commentBusiness.getAllComments(input)).rejects.toThrow(
      "'token' ausente"
    );
  });
});
