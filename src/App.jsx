import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { initialEmployees } from "./data/employees.js";
import Navbar from "./components/Navbar.jsx";
import StatsCard from "./components/StatsCard.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import SearchFilter from "./components/SearchFilter.jsx";
import Modal from "./components/Modal.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";

function App() {

  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter((employee) => employee.status === "Active").length;
  const inactiveEmployees = employees.filter((employee) => employee.status === "Inactive").length;

  const departments = new Set(employees.map((employee) => employee.department)).size;

  const filterEmployees = employees.filter((employee) => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) 

    const matchesDepartment = department === "All" || employee.department === department;
    const matchesStatus = status === "All" || employee.status === status;

    return matchesSearch && matchesDepartment && matchesStatus;
  })

  const handleAddEmployee = () => {
    console.log("Add Employee clicked");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  }

  const handleSaveEmployee = (employeeData) => {
    const newEmployee = {
      id: Date.now(),
      ...employeeData,
    }

    setEmployees((currectEmployees) => [
      ...currectEmployees,
      newEmployee,
    ])

    setIsModalOpen(false);

  }

  const handleDeleteEmployee = (id) => {
    setEmployees((currentEmployees) => 
      currentEmployees.filter((employee) => employee.id !== id)
    )
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  }

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
    setEditingEmployee(null);
    setIsModalOpen(false);
  }
  
  return (
    <div>

      <Navbar />
      
      <main className="dashboard">
        <h1 className="dashboard-title">Employee Dashboard</h1>

        <section className="dashboard">
          <h2>Statistics</h2>
          <div className="stats-cards">
            <StatsCard title="Total Employees" value={totalEmployees} />
            <StatsCard title="Active Employees" value={activeEmployees} />
            <StatsCard title="Inactive Employees" value={inactiveEmployees} />
            <StatsCard title="Departments" value={departments} />
          </div>
        </section>



        <div className="employee-section-header">
          <h2>Add Employee</h2>

          <button
            className="primary-button"
            onClick={handleAddEmployee}
          >
            <IoAddOutline size={20} />
          </button>
        </div>


        <section>
          <h2>Employee List</h2>
          <SearchFilter
            search={search}
            onSearchChange={setSearch} 
            department={department}
            status={status}
            onDepartmentChange={setDepartment}
            onStatusChange={setStatus}
          />

          <EmployeeTable
            employees={filterEmployees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        </section>
      </main>


      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        
        <h2>
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </h2>
        
        <EmployeeForm 
          employee={editingEmployee} 
          onSave={editingEmployee ? handleUpdateEmployee : handleSaveEmployee} 
        />
      </Modal>
    </div>
  );
}

export default App;