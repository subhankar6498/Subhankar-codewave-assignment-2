import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserData } from "../../UserReducer";

const EditUser = () => {
  const { id } = useParams();
  const [updateUser, setUpdateUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state.users.data);
  //   console.log(state);

  useEffect(() => {
    if (id) {
      const existingUser = state.filter((ele) => ele.id == id);
      setUpdateUser(existingUser[0]);
    }
  }, []);

  const newData = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData(updateUser));
    alert("Successfully updated the user");
    navigate("/");
  };

  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-light p-5">
          <h2 className="text-center mb-2">Update User</h2>
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
                value={updateUser && updateUser.name}
                onChange={newData}
              />
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
                value={updateUser && updateUser.email}
                onChange={newData}
              />
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
                value={updateUser && updateUser.phone}
                onChange={newData}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-info"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
