import { useEffect, useState } from "react";
import NavBar from "../common/NavBar";
import {
  getUserProfileFromJWT,
  updateUserProfile,
} from "../../service/user/userService";
import { Toaster } from "react-hot-toast";
import PageTransition from "../animation/PageTransition";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  //const [photo, setPhoto] = useState(null); // For storing the file object

  useEffect(() => {
    const getProfile = async () => {
      const userProfile = await getUserProfileFromJWT();
      console.log(userProfile);
      if (userProfile) {
        setBio(userProfile.bio);
        setName(userProfile.name);
      }
      return;
    };
    getProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name, bio);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <Toaster/>
      <NavBar />
      <div className="min-h-screen  flex justify-center items-center">
        <div className="bg-black shadow-md rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-primary mb-6">
            Update Profile
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label
                className="block text-white font-medium mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Bio Input */}
            <div className="mb-4">
              <label
                className="block text-white font-medium mb-2"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your bio"
                rows="4"
                required
              />
            </div>

            {/* Photo Upload */}
            {/* <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="photo">
                Profile Photo
              </label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div> */}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      <PageTransition/>
    </>
  );
};

export default UpdateProfile;
