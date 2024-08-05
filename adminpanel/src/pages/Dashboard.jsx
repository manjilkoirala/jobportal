import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchUsersAndJobs = async () => {
      try {
        const usersResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/getall`
        );
        const jobsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/job/getall`
        );
        setUsers(usersResponse.data.users);
        setJobs(jobsResponse.data.jobs);
      } catch (error) {
        console.error("Error fetching users and jobs:", error);
      }
    };
    fetchUsersAndJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user/delete/${id}`
      );
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/job/deletebyadmin/${id}`
      );
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-6">Welcome to the admin dashboard!</p>
        <button
          onClick={handleLogout}
          className="mb-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>

        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Role</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Jobs</h2>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Company</th>
                <th className="py-2 px-4 border-b text-left">Posted By</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td className="py-2 px-4 border-b">{job.title}</td>
                  <td className="py-2 px-4 border-b">{job.companyName}</td>
                  <td className="py-2 px-4 border-b">{job.postedBy.email}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
