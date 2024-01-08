import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../UserReducer";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [users, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const getUserData = (e) => {
    const { name, value } = e.target;
    setUser({
      ...users,
      [e.target.name]: e.target.value,
    });

    // Update the form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    let valid = true;
    const newErrors = { ...errors };

    // Name validation
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Phone validation
    if (formData.phone.trim() === "" || isNaN(formData.phone)) {
      newErrors.phone = "Invalid phone number";
      valid = false;
    }

    // Update errors state
    setErrors(newErrors);

    // If the form is valid, you can proceed with the submission
    if (valid) {
      // console.log(users);
      dispatch(addNewUser(users));
      alert("Successfully added the user");
      navigate("/");
    }
  };

  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-light p-5">
          <h2 className="text-center mb-2">Add New User</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={getUserData}
              />
              <span style={{ color: "red" }}>{errors.name}</span>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={getUserData}
              />
              <span style={{ color: "red" }}>{errors.email}</span>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                onChange={getUserData}
              />
              <span style={{ color: "red" }}>{errors.phone}</span>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-info"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
