// utils/authUtils.js or a similar file
import axios from "axios";
import { setUser } from "@/store/user";

const checkProfile = async (dispatch: any, router: any) => {
  try {
    const { data } = await axios.get(
      `${process.env.SERVER_SIDE}/auth/verifyUser`,
      {
        withCredentials: true,
      }
    );

    if (!data.user) {
      router.push("/login");
      return;
    }
    console.log(data, "hello data");
    dispatch(setUser(data.user));
    if (!data.user.createdProfile) {
      router.push("/createProfile");
    } else {
      router.push("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
};

export default checkProfile;
