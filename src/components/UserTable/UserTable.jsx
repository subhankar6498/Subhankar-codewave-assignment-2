import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, deleteUser } from "../../UserReducer";
import { Link } from "react-router-dom";

const UserTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleDeleteUser = useCallback(
    (name, id) => {
      const confirmed = window.confirm(
        `Are you sure you want to delete  ${name}`
      );
      if (confirmed) {
        dispatch(deleteUser(id));
        alert("Successfully deleted the user");
      }
    },
    [dispatch]
  );

  const state = useSelector((state) => state.users);
  const { data, loading, error } = state;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading user data</p>;
  }

  return (
    <>
      <div className="container mt-5 bg-body-secondary">
        <h2 className="text-center pt-5">User Management Application</h2>
        <Link to="/create" className="btn btn-success my-3">
          Create User
        </Link>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Link
                        to={`/edit/${user.id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </Link>
                      <Link
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDeleteUser(user.name, user.id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserTable;
