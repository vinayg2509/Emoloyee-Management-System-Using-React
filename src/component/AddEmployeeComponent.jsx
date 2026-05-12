import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { addEmployee, getEmployeeById, updateEmployee } from "../services/EmployeeServices";
import 'react-toastify/dist/ReactToastify.css'; 
const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [error, setError]         = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast]       = useState(false);
  const { id }   = useParams();
  const navigate = useNavigate();

  const validateForm = () => {
    const newError = {};
    if (!firstName) newError.firstName = "First Name is Required";
    else if (firstName.length < 2) newError.firstName = "Minimum 2 characters";
    if (!lastName) newError.lastName = "Last Name is Required";
    else if (lastName.length < 2) newError.lastName = "Minimum 2 characters";
    if (!email) newError.email = "Email is Required";
    else if (!email.includes("@")) newError.email = "Enter a valid email";
    return newError;
  };

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  function saveEmployee(e) {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const newEmployee = { firstName, lastName, email };

    if (id) {
      updateEmployee(id, newEmployee)
        .then(() => {
          setToastMessage("Employee updated successfully!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
            navigate("/home");
          }, 2000);
        })
        .catch((error) => console.error(error));
    } else {
      addEmployee(newEmployee)
        .then(() => {
          setToastMessage("Employee added successfully!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
            navigate("/home");
          }, 2000);
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <div className="container mt-5">

      {/* ✅ Toast is INSIDE return */}
      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div className="toast show align-items-center text-bg-success border-0">
            <div className="d-flex">
              <div className="toast-body">{toastMessage}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setShowToast(false)}/>
            </div>
          </div>
        </div>
      )}

      <div className="row justify-content-center">
        <div className="card" style={{ width: "25rem" }}>
          <div className="card-body">
            <h5 className="card-title">
              {id ? `Update Employee — ID: ${id}` : "Add New Employee"}
            </h5>

            <div className="mb-3">
              <div className="form-label text-start">First Name:</div>
              <input type="text"
                className={`form-control ${error.firstName ? "is-invalid" : ""}`}
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}/>
              {error.firstName &&
                <div className="invalid-feedback">{error.firstName}</div>}
            </div>

            <div className="mb-3">
              <div className="form-label text-start">Last Name:</div>
              <input type="text"
                className={`form-control ${error.lastName ? "is-invalid" : ""}`}
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}/>
              {error.lastName &&
                <div className="invalid-feedback">{error.lastName}</div>}
            </div>

            <div className="mb-3">
              <div className="form-label text-start">Email Id:</div>
              <input type="email"
                className={`form-control ${error.email ? "is-invalid" : ""}`}
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
              {error.email &&
                <div className="invalid-feedback">{error.email}</div>}
            </div>

            <button className="btn btn-outline-success w-100"
              type="button"
              onClick={saveEmployee}>
              {id ? "Update Employee" : "Save Employee"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;