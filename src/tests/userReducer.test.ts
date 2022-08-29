import {
  authUser,
  loginUser,
  registerUser,
} from "../redux/reducers/userReducer";
import createTestStore from "./store";
import { loginData, registerData } from "./utils/userTestData";

let store = createTestStore();

describe("test user reducer", () => {
  test("should resgister user info", async () => {
    await store.dispatch(registerUser(registerData));
    const result = store.getState().authReducer;
    expect(result.userList.length).toBe(1);
  });
  test("user should login successfully", async () => {
    await store.dispatch(loginUser(loginData));
    const result = store.getState().authReducer;
    expect(result.userToken?.token).toBeDefined();
  });
  test("should get user info using Token", async () => {
    // const result = store.getState().authReducer;
    // if (result.userToken?.token != undefined) {
    //   await store.dispatch(authUser(result.userToken));
    //   const user = store.getState().authReducer.userAuth;
    //   expect(user?.email).toBeDefined();
    // }
  });
});
