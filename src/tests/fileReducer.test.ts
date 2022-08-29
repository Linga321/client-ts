import { fetchFile, uploadFile } from "../redux/reducers/fileReducer";
import createTestStore from "./store";

const filedata = "C:\Users\gajal\Downloads\fall-autumn-red-season.jpg"; // copy paste file path
let store = createTestStore();

describe("test file reducer", () => {
  test("Upload image to server", async () => {
    await store.dispatch(uploadFile(filedata));
    const result = store
    .getState()
    .fileReducer
    expect(result.fileName).toBeDefined();
  });

  test("fetch File from server", async () => {
    const result = store
    .getState()
    .fileReducer
    await store.dispatch(fetchFile(result.fileName));
    expect(result.fileName).toEqual(`https://api.escuelajs.co/api/v1/files/${result.fileName}`);
  });
});
