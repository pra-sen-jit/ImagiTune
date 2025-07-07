import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AuthService } from "../services/authService";

const Profile = () => {
  const { user, login } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [contact, setContact] = useState(user?.contact || "");
  const [dob, setDob] = useState(user?.dob ? user.dob.slice(0, 10) : "");
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [contactError, setContactError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFullName(user?.fullName || "");
    setContact(user?.contact || "");
    setDob(user?.dob ? user.dob.slice(0, 10) : "");
    setAvatar(user?.avatar);
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setContact(value);
    if (value.length > 0 && value.length !== 10) {
      setContactError("Contact number should be exactly 10 digits");
    } else {
      setContactError("");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    if (contact.length !== 10) {
      setContactError("Contact number should be exactly 10 digits");
      return;
    }
    try {
      const updated = await AuthService.updateProfile({
        fullName,
        contact,
        dob,
        avatar: avatarFile,
      });
      setAvatar(updated.avatar);
      setPreview(null);
      setSuccessMsg("Profile updated successfully!");
      login(localStorage.getItem("authToken") || "", updated); // update context
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-2">
            <img
              src={preview || (avatar ? avatar : "/default-avatar.png")}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-xs hover:bg-purple-700"
            >
              Change
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm">{user?.email}</p>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Username</label>
          <input
            type="text"
            value={user?.username || ""}
            disabled
            className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full px-4 py-2 rounded border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Contact Number</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={contact}
            onChange={handleContactChange}
            className="w-full px-4 py-2 rounded border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter 10-digit phone number"
            maxLength={10}
          />
          {contactError && (
            <p className="text-red-500 text-xs mt-1">{contactError}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            className="w-full px-4 py-2 rounded border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        {successMsg && <p className="text-green-500 text-center">{successMsg}</p>}
        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile; 