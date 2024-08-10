import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      toast.success(message);
      navigateTo("/dashboard");
    }
  }, [dispatch, error, loading, isAuthenticated, message, navigateTo]);

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h3>Create a new account</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="wrapper">
              <div className="inputTag">
                <label>Register As</label>
                <div>
                  <select
                    {...formRegister("role", { required: "Role is required" })}
                  >
                    <option value="">Select Role</option>
                    <option value="Employer">Register as an Employer</option>
                    <option value="Job Seeker">Register as a Job Seeker</option>
                  </select>
                  <FaRegUser />
                </div>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div className="inputTag">
                <label>Name</label>
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...formRegister("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name should not contain numbers",
                      },
                    })}
                  />
                  <FaPencilAlt />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="wrapper">
              <div className="inputTag">
                <label>Email Address</label>
                <div>
                  <input
                    type="email"
                    placeholder="youremail@gmail.com"
                    {...formRegister("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <MdOutlineMailOutline />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="inputTag">
                <label>Phone Number</label>
                <div>
                  <input
                    type="tel"
                    placeholder="111-222-333"
                    {...formRegister("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Phone number should be 10 digits",
                      },
                    })}
                  />
                  <FaPhoneFlip />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="wrapper">
              <div className="inputTag">
                <label>Address</label>
                <div>
                  <input
                    type="text"
                    placeholder="Your Address"
                    {...formRegister("address", {
                      required: "Address is required",
                    })}
                  />
                  <FaAddressBook />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="inputTag">
                <label>Password</label>
                <div>
                  <input
                    type="password"
                    placeholder="Your Password"
                    {...formRegister("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password should be at least 8 characters",
                      },
                    })}
                  />
                  <RiLock2Fill />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {errors.role?.type === "value" &&
              errors.role.message === "Job Seeker" && (
                <>
                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Your First Niche</label>
                      <div>
                        <select
                          {...formRegister("firstNiche", {
                            required: "First niche is required",
                          })}
                        >
                          <option value="">Your Niche</option>
                          {nichesArray.map((niche, index) => (
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          ))}
                        </select>
                        <MdCategory />
                      </div>
                      {errors.firstNiche && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstNiche.message}
                        </p>
                      )}
                    </div>
                    <div className="inputTag">
                      <label>Your Second Niche</label>
                      <div>
                        <select {...formRegister("secondNiche")}>
                          <option value="">Your Niche</option>
                          {nichesArray.map((niche, index) => (
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          ))}
                        </select>
                        <MdCategory />
                      </div>
                    </div>
                    <div className="inputTag">
                      <label>Your Third Niche</label>
                      <div>
                        <select {...formRegister("thirdNiche")}>
                          <option value="">Your Niche</option>
                          {nichesArray.map((niche, index) => (
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          ))}
                        </select>
                        <MdCategory />
                      </div>
                    </div>
                  </div>
                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Cover Letter</label>
                      <div>
                        <textarea {...formRegister("coverLetter")} rows={10} />
                      </div>
                    </div>
                  </div>
                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Resume</label>
                      <div>
                        <input
                          type="file"
                          {...formRegister("resume")}
                          style={{ border: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            <button type="submit" disabled={loading}>
              Register
            </button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
