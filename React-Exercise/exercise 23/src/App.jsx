import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    experience: "",
    skills: [],
    terms: false,
    notifications: false,
  });

  const [errors, setErrors] = useState({});

  // Handle text inputs and select
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Handle skills checkbox
  function handleSkillChange(event) {
    const { value, checked } = event.target;

    if (checked) {
      setFormData({
        ...formData,
        skills: [...formData.skills, value],
      });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter((skill) => skill !== value),
      });
    }
  }

  // Handle terms and notifications
  function handleCheckboxChange(event) {
    const { name, checked } = event.target;

    setFormData({
      ...formData,
      [name]: checked,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    // Full name
    if (formData.fullName.trim() === "") {
      newErrors.fullName = "Full name is required";
    }

    // Email
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }

    // Role
    if (formData.role === "") {
      newErrors.role = "Please select a role";
    }

    // Experience
    if (formData.experience === "") {
      newErrors.experience = "Experience is required";
    }

    // Skills
    if (formData.skills.length === 0) {
      newErrors.skills = "Please select at least one skill";
    }

    // Terms
    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms";
    }

    setErrors(newErrors);

    // If there are no errors
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      alert("Application submitted successfully!");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-8 px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          Developer Application Form
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 outline-none ${
                errors.fullName
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 outline-none ${
                errors.email
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 bg-white ${
                errors.role
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select a role</option>
              <option value="Frontend Developer">
                Frontend Developer
              </option>
              <option value="Backend Developer">
                Backend Developer
              </option>
              <option value="Full Stack Developer">
                Full Stack Developer
              </option>
              <option value="Mobile Developer">
                Mobile Developer
              </option>
            </select>

            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role}
              </p>
            )}
          </div>

          {/* Experience */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              Years of Experience
            </label>

            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 outline-none ${
                errors.experience
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />

            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-3">
              Skills
            </label>

            <div className="grid grid-cols-2 gap-3">

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="React"
                  checked={formData.skills.includes("React")}
                  onChange={handleSkillChange}
                />
                React
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="JavaScript"
                  checked={formData.skills.includes("JavaScript")}
                  onChange={handleSkillChange}
                />
                JavaScript
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="TypeScript"
                  checked={formData.skills.includes("TypeScript")}
                  onChange={handleSkillChange}
                />
                TypeScript
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Node.js"
                  checked={formData.skills.includes("Node.js")}
                  onChange={handleSkillChange}
                />
                Node.js
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Python"
                  checked={formData.skills.includes("Python")}
                  onChange={handleSkillChange}
                />
                Python
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Java"
                  checked={formData.skills.includes("Java")}
                  onChange={handleSkillChange}
                />
                Java
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="UI Design"
                  checked={formData.skills.includes("UI Design")}
                  onChange={handleSkillChange}
                />
                UI Design
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="API Development"
                  checked={formData.skills.includes("API Development")}
                  onChange={handleSkillChange}
                />
                API Development
              </label>

            </div>

            {errors.skills && (
              <p className="text-red-500 text-sm mt-2">
                {errors.skills}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="mb-5">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleCheckboxChange}
              />

              <span className="text-sm">
                I agree to the terms and conditions
              </span>
            </label>

            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">
                {errors.terms}
              </p>
            )}
          </div>

          {/* Notifications */}
          <div className="mb-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleCheckboxChange}
              />

              <span className="text-sm">
                Receive notifications about new opportunities
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
}

export default App;