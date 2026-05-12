import React from "react";
import { useNavigate } from "react-router";


const HeaderComponent = () => {

    const navigator=useNavigate()
    
    function addEmployee(){
        navigator("/add-employee")
    }

    function getAllEmployee()
    {
      navigator("/getall")
    }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          Employee Management System
        </a>
        <div style={{ marginRight: '8px' }}>
           <button type="button" className="btn btn-light" onClick={addEmployee}>ADD EMPLOYEE</button>
          <button type="button" className="btn btn-light" onClick={getAllEmployee}>View All EMPLOYEE</button>

        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
