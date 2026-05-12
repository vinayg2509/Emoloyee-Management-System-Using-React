import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { addEmployee, getEmployeeById,updateEmployee } from "../services/EmployeeServices";

const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const { id } = useParams();

  const validateForm = () => {
    const newError = {};
    if (!firstName) newError.firstName = "First Name is Required";
    else if (firstName.length < 2)
      newError.firstName = "First Name length should be greater than two";

    if (!lastName) newError.lastName = "Last Name is Required";
    else if (lastName.length < 2)
      newError.lastName = "Last Name length should be greater than two";

    if (!email) newError.email = "Email Name is Required";
    else if (!email.includes("@")) newError.email = "Enter a valid email";

    return newError;
  };

  const addEmployeeNavigator = useNavigate();

  function saveEmployee(e) {
    e.preventDefault();
    const errors = validateForm();
    

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    } 
      const newEmployee = { firstName, lastName, email };
     
     if(id)
     {
       updateEmployee(id,newEmployee).then((response) => {
        alert("Employee updated Succesfully")
        addEmployeeNavigator("/home");
        
      });
     }
     else
     {
       addEmployee(newEmployee).then((response) => {
         alert("Employee Added Succesfully")
        addEmployeeNavigator("/home");
      });
     }
    
  }

  function title() {
    if (id) {
      return (
        <h5 className="card-title">{`Update Employee Here with  ${id}`}</h5>
      );
    } else {
      return <h5 className="card-title">Add New Employee Here</h5>;
    }
  }

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
               console.log("Employee data:", response.data)
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error)=>{
        console.error(error);
      })

    }
  }, [id]);



  return (
    <div className="container mt-5" style={{ alignContent: "center" }}>
      <div className="row row justify-content-center">
        <div className="card" style={{ width: "25rem" }}>
          <div className="card-body">
            {title()}

            <div className="mb-3">
              <div className="form-label text-start">First Name:</div>
              <input
                type="text"
                className={` form-control ${error.firstName ? "is-invalid" : " "} `}
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {error.firstName && (
                <div className="invalid-feedback text-start">
                  {error.firstName}
                </div>
              )}
            </div>

            <div className="mb-3">
              <div className="form-label text-start">Last Name:</div>
              <input
                type="text"
                className={` form-control ${error.lastName ? "is-invalid" : " "} `}
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {error.lastName && (
                <div className="invalid-feedback text-start">
                  {error.lastName}
                </div>
              )}
            </div>

            <div className="mb-3">
              <div className="form-label text-start">Email Id:</div>
              <input
                type="email"
                className={` form-control ${error.email ? "is-invalid" : " "} `}
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email && (
                <div className="invalid-feedback text-start">{error.email}</div>
              )}
            </div>

            <div className="input-group mb-3">
              <button
                className="btn btn-outline-success"
                type="button"
                id="button-addon1"
                onClick={saveEmployee}
              >
                Save Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;
