import axios from 'axios';

const BASE_URL = "http://localhost:8080/employee";

export const listAllEmployee = () => axios.get(`${BASE_URL}`);
export const addEmployee =(employee)=>axios.post(`${BASE_URL}/create`,employee)
export const getEmployeeById = (id) => axios.get(`${BASE_URL}/getbyid/${id}`)
export const updateEmployee=(id,employee)=>axios.put(`${BASE_URL}/update/${id}`,employee)
export const deleteEmployeeById = (id) => axios.delete(`${BASE_URL}/deleteById/${id}`)                                                                  