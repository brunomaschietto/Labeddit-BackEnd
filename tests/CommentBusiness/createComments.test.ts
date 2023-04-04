import { CommentBusiness } from "../../src/business/CommentBusiness";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";

describe("Criar comentários", () => {
  const commentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("Deve retornar a criação de um comentário", async () => {
    const input = { postId: "p001", token: "token-mock-normal", content: "Hello World" };
    await commentBusiness.createComment(input);
  });
  test("Deve retornar um erro caso o Token esteja ausente", async() => {
    const input = { postId: "p001", token: undefined, content: "Hello World" };
    
    return expect(commentBusiness.createComment(input)).rejects.toThrow("'token' ausente");
  })
});
