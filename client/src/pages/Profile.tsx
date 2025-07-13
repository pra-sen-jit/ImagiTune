import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AuthService } from "../services/authService";

const Profile = () => {
  const { user, login, logout } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [contact, setContact] = useState(user?.contact || "");
  const [dob, setDob] = useState(user?.dob ? new Date(user.dob).toISOString().split('T')[0] : "");
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [contactError, setContactError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<'settings' | 'music'>('settings');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setContact(user.contact || "");
      setDob(user.dob ? new Date(user.dob).toISOString().split('T')[0] : "");
      setAvatar(user.avatar);
    }
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
    
    if (contact && contact.length !== 10) {
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
      
      login(localStorage.getItem("authToken") || "", {
        ...user!,
        fullName,
        contact,
        dob,
        avatar: updated.avatar
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update profile");
    }
  };

  // Sidebar navigation items
  const navItems = [
    { key: 'settings', label: 'Profile Settings', icon: '⚙️' },
    { key: 'music', label: 'Generated Music', icon: '🎵' },
  ];

  return (
    <div className="flex h-full bg-white dark:bg-gray-800">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-72 h-screen bg-gradient-to-b from-purple-700 to-blue-700 text-white flex flex-col pt-20 pb-12 px-4 select-none z-20 overflow-y-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-28 h-28 mb-3">
            <img
              src={preview || (avatar ? avatar : "/default-avatar.png")}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-white text-purple-700 px-2 py-1 rounded-full text-xs font-bold shadow hover:bg-gray-200"
              title="Change profile photo"
            >
              ✏️
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="text-lg font-semibold mt-1 text-center break-all max-w-[12rem]">{fullName || user?.username}</div>
          <div className="text-sm text-purple-200">@{user?.username}</div>
        </div>
        <nav className="w-full flex flex-col gap-2 mb-8">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-left font-medium transition-colors ${activeTab === item.key ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
              onClick={() => setActiveTab(item.key as 'settings' | 'music')}
            >
              <span className="text-xl">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-auto w-full py-2 px-4 rounded-lg bg-white text-purple-700 font-semibold hover:bg-purple-100 transition-colors"
        >
          Log Out
        </button>
      </aside>
      {/* Main Content */}
      <main className="ml-72 flex-1 min-h-screen p-8 box-border">
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Profile Settings</h2>
            <form onSubmit={handleSave} className="space-y-6 max-w-lg">
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
        )}
        {activeTab === 'music' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Generated Music</h2>
            <p className="text-gray-600 dark:text-gray-300">Your generated music will appear here.</p>
            {/* TODO: List user's generated music */}
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;