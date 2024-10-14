import { getUserProfileFromJWT } from "../../service/user/userService";
export const checkUserRole =async () => {
    const profile = await getUserProfileFromJWT(); 
    return profile?.role === "ROLE_ADMIN";

  };