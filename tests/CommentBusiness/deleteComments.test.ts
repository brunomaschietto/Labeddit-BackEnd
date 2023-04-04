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
  test("Deve deletar um comentário pelo ID", async () => {
    const input = {
      idToDelete: "c001",
      token: "token-mock-admin",
    };
    const response = await commentBusiness.deleteComment(input);
    expect(response).not.toBe(input)
  });
});
