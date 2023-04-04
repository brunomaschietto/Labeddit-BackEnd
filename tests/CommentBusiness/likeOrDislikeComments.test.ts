import { CommentBusiness } from "../../src/business/CommentBusiness";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";

describe("Deletar comentários", () => {
  const commentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );
  test("Deve retornar um erro se 'like' não for booleano", () => {
    const input = {
      idToLikeOrDislike: "c001",
      token: "token-mock-admin",
      like: 1,
    };
    expect(async () => {
      await commentBusiness.likeOrDislikeComment(input);
    }).rejects.toThrow("'like' deve ser boolean");
  });
});
