import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

function EditProfile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age ?? "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skillsRaw, setSkillsRaw] = useState((user?.skills || []).join(", "));
  const [message, setMessage] = useState("");
  const [messageKind, setMessageKind] = useState("idle"); // "success" | "error" | "idle"
  const [busy, setBusy] = useState(false);

  if (!user) {
    return (
      <p className="mt-10 text-sm text-center text-fg-muted">
        Loading profile…
      </p>
    );
  }

  const skills = skillsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const previewUser = {
    firstName,
    lastName,
    about,
    age,
    gender,
    skills,
    photoUrl,
  };

  const saveProfile = async () => {
    setMessage("");
    setMessageKind("idle");
    setBusy(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about, skills },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setMessage("Profile saved!");
      setMessageKind("success");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err?.response?.data || "Failed to save profile");
      setMessageKind("error");
      console.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile();
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 grid gap-8 lg:grid-cols-2 lg:items-start">
      <form onSubmit={handleSubmit} className="space-y-3 animate-fade-in">
        <h1 className="text-2xl font-bold text-fg tracking-tight mb-4">
          Edit Profile
        </h1>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              className="input"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              className="input"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="photoUrl">
            Photo URL
          </label>
          <input
            id="photoUrl"
            type="url"
            required
            className="input"
            placeholder="https://…"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              type="number"
              required
              className="input"
              placeholder="28"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="gender">
              Gender
            </label>
            <input
              id="gender"
              type="text"
              className="input"
              placeholder="e.g. male, female, non-binary…"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="about">
            About
          </label>
          <textarea
            id="about"
            className="input h-auto py-2 min-h-24 resize-y leading-relaxed"
            placeholder="What are you building? What are you looking for?"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="skills">
            Skills <span className="text-fg-muted font-normal">(comma separated)</span>
          </label>
          <input
            id="skills"
            type="text"
            className="input"
            placeholder="React, Go, Kubernetes, …"
            value={skillsRaw}
            onChange={(e) => setSkillsRaw(e.target.value)}
          />
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {skills.map((s, i) => (
                <span key={`${s}-${i}`} className="skill">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        <p
          aria-live="polite"
          className={`text-sm h-5 ${messageKind === "error" ? "text-rose-500" : messageKind === "success" ? "text-emerald-500" : "text-transparent"}`}
        >
          {message || "·"}
        </p>

        <button
          type="submit"
          disabled={busy}
          className="btn-primary w-full"
        >
          {busy ? "Saving…" : "Save Profile"}
        </button>
      </form>

      <div className="lg:sticky lg:top-20 space-y-3">
        <p className="text-sm text-fg-muted font-medium">Live preview</p>
        <UserCard user={previewUser} showActions={false} />
      </div>
    </div>
  );
}

export default EditProfile;
