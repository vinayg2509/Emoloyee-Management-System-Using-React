import React, { useState, useEffect } from "react";
import { listAllEmployee } from "../services/EmployeeServices";
import { useNavigate,useParams } from "react-router";
import { getEmployeeById,deleteEmployeeById } from './../services/EmployeeServices';
import { toast } from "react-toastify";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal,setShowModal]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const navigator=useNavigate();
  const {id}=useParams()

  useEffect(() => {
    listAllEmployee()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function updateEmployee(id)
  {
    navigator(`/update-employee/${id}`)
  }
  function deleteEmployee(id)
  {
    setDeleteId(id)
    setShowModal(true)
  }

const handelConfirm = async () => {
    try {
        await deleteEmployeeById(deleteId)
        setEmployees(prev => 
            prev.filter(emp => emp.id !== Number(deleteId))  // ✅ Number() fixes type mismatch
        )
        toast.success("Deleted successfully!")
    } catch(error) {
        console.log("Error:", error.response?.status, error.response?.data)
        toast.error("Failed to delete.")
    } finally {
        setShowModal(false)
        setDeleteId(null)
    }
}

  return (
    <>

      <h2>List of Employees</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Emp Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>

              <td>
                
                <button
                  className="bi bi-trash3 btn btn-danger"
                  style={{ marginRight: '8px' }}
                  onClick={() => deleteEmployee(employee.id)}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5  .5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </button>
                  <button
                  className="bi bi-pencil-fill btn btn-success"
                  onClick={() => updateEmployee(employee.id)}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                  </svg>
                </button>
              </td>

              <td>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button className="btn-close"
                    onClick={() => setShowModal(false)}/>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete employee <strong>ID: {deleteId}</strong>?</p>
                  <p className="text-danger">This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary"
                    onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-danger"
                    onClick={handelConfirm}>   {/* ✅ correct spelling */}
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListEmployeeComponent;
