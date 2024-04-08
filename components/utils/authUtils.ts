// utils/authUtils.js or a similar file
import axios from "axios";
import { setUser } from "@/store/user";

const checkProfile = async (dispatch: any, router: any) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/verifyUser`,
      {
        withCredentials: true,
      }
    );

    if (!data.user) {
      router.push("/login");
      return;
    }
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
