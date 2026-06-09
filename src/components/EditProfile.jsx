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
  const [specialization, setSpecialization] = useState(
    user?.specialization || "",
  );
  const [experience, setExperience] = useState(user?.experience ?? "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [lookingFor, setLookingFor] = useState(user?.lookingFor || "");
  const [socialLinks, setSocialLinks] = useState(user?.socialLinks || []);
  const [company, setCompany] = useState(user?.company || "");
  const [contactEmail, setContactEmail] = useState(user?.contactEmail || "");
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
    specialization,
    experience,
    city,
    country,
    lookingFor,
    socialLinks,
    company,
    contactEmail,
  };

  const saveProfile = async () => {
    setMessage("");
    setMessageKind("idle");
    setBusy(true);
    try {
      const payload = {
        firstName,
        lastName,
        photoUrl,
        about,
        skills,
        specialization,
        city,
        country,
        lookingFor,
        socialLinks,
        company,
        contactEmail,
        gender: gender,
        age: age === "" ? "" : Number(age),
        experience: experience === "" ? "" : Number(experience),
      };

      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });
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

  const addSocialLink = () => {
    if (socialLinks.length >= 5) return;
    setSocialLinks([...socialLinks, { title: "", url: "" }]);
  };

  const updateSocialLink = (index, field, value) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  const removeSocialLink = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
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
            <label className="label" htmlFor="specialization">
              Specialization
            </label>
            <input
              id="specialization"
              type="text"
              className="input"
              placeholder="e.g. Full Stack Developer"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="experience">
              Experience (years)
            </label>
            <input
              id="experience"
              type="number"
              min={0}
              max={60}
              className="input"
              placeholder="5"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            type="text"
            className="input"
            placeholder="e.g. Google, Freelance, Student"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              className="input appearance-none bg-surface"
              value={gender || ""}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Not selected</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              type="number"
              className="input"
              placeholder="28"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="city">
              City
            </label>
            <input
              id="city"
              type="text"
              className="input"
              placeholder="Mumbai"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="country">
              Country
            </label>
            <input
              id="country"
              type="text"
              className="input"
              placeholder="India"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="skills">
            Skills{" "}
            <span className="text-fg-muted font-normal">(comma separated)</span>
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
          <label className="label" htmlFor="lookingFor">
            Looking for
          </label>
          <textarea
            id="lookingFor"
            className="input h-auto py-2 min-h-24 resize-y leading-relaxed"
            placeholder="What kind of people or opportunities are you looking for?"
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="contactEmail">
            Contact Email
          </label>
          <input
            id="contactEmail"
            type="email"
            className="input"
            placeholder="your@email.com"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Social Links</label>
          <div className="space-y-2">
            {socialLinks.map((link, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  className="input flex-1"
                  placeholder="Title (e.g. GitHub)"
                  value={link.title}
                  onChange={(e) =>
                    updateSocialLink(index, "title", e.target.value)
                  }
                />
                <input
                  type="url"
                  className="input flex-1"
                  placeholder="https://..."
                  value={link.url}
                  onChange={(e) =>
                    updateSocialLink(index, "url", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="px-3 py-1.5 text-sm text-rose-500 hover:text-rose-600 transition-colors"
                  aria-label="Remove link"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {socialLinks.length < 5 && (
            <button
              type="button"
              onClick={addSocialLink}
              className="mt-2 flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add another link
            </button>
          )}
        </div>

        <p
          aria-live="polite"
          className={`text-sm h-5 ${messageKind === "error" ? "text-rose-500" : messageKind === "success" ? "text-emerald-500" : "text-transparent"}`}
        >
          {message || "·"}
        </p>

        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? "Saving…" : "Save Profile"}
        </button>
      </form>

      <div className="lg:sticky lg:top-20">
        <div className="w-full max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-fg tracking-tight mb-2">
            Live Preview
          </h2>
          <p className="text-sm text-fg-muted mb-6">
            How your profile will appear to others in the feed.
          </p>
          <UserCard
            user={previewUser}
            showActions={false}
            className="shadow-lg w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
