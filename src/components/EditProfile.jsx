import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./userCard";

function EditProfile({ user }) {
  // const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [skills, setSkills] = useState(user?.skills || []);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setMessage("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
      setMessage("Profile saved!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setMessage(err?.response?.data);
      console.error(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    saveProfile();
  };

  return (
    <div className="flex gap-10 mt-20 justify-center items-start">
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box w-lg *:w-full border p-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <legend className="fieldset-legend text-2xl text-center">
          Edit Profile
        </legend>

        <label className="label mt-3">First Name</label>
        <input
          type="text"
          required
          className="input"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label mt-3">Last Name</label>
        <input
          type="text"
          required
          className="input"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="label mt-3">Photo Url</label>
        <input
          type="url"
          required
          className="input"
          placeholder="Photo Url"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <label className="label mt-3">Age</label>
        <input
          type="number"
          required
          className="input"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="label mt-3">Gender</label>
        <input
          type="text"
          required
          className="input"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <label className="label mt-3">About</label>
        <textarea
          required
          className="textarea"
          placeholder="About"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <label className="label mt-3">{"Skills (separate using comma)"}</label>
        <input
          type="text"
          required
          className="input"
          placeholder="Skills (separate using comma)"
          value={skills.join(",")}
          onChange={(e) => setSkills(e.target.value.split(","))}
        />

        <p className={`text-red-500`}>{message || " "}</p>

        <button
          className="btn btn-neutral my-3 disabled:opacity-70"
          type="submit"
        >
          Save Profile
        </button>
      </form>

      {/* Profile Preview Card */}
      <div className="flex-col space-y-5">
        <div className="font-semibold text-2xl w-fit px-6 py-3 bg-base-200 border-base-100 rounded-xl border">
          Profile Preview
        </div>
        <UserCard
          user={{ firstName, lastName, about, age, gender, skills, photoUrl }}
        />
      </div>
    </div>
  );
}

export default EditProfile;
