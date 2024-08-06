import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch the list of admins from the server
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/admin/getall`)
      .then((response) => {
        console.log("Admins:", response.data.admins);
        setAdmins(response.data.admins);
      })
      .catch((error) => {
        console.error("There was an error fetching the admins!", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Admins</h1>
        <div className="w-full">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>

                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id}>
                  <td className="py-2 px-4 border-b">{admin.name}</td>
                  <td className="py-2 px-4 border-b">{admin.email}</td>

                  <td className="py-2 px-4 border-b">
                    {/* Add any actions you want here */}
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

export default Admin;
