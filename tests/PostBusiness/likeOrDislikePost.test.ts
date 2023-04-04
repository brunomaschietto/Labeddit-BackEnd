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

  test("Deve retornar um erro se 'like' não for booleano", () => {
    const input = {idToLikeOrDislike: 'p001', token: 'token-mock-admin', like: 1}
    expect(async() => {
        await postBusiness.likeOrDislikePost(input)
    }).rejects.toThrow("'like' deve ser boolean")
  })
});
