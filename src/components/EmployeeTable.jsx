function EmployeeTable({ employees, onEdit, onDelete }) {
    return (
        <div className="employee-container">
            <table className="employee-table">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th> 
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department}</td>
                            <td>{employee.role}</td>
                            <td>
                                <span className={employee.status === "Active" ? "status-badge status-active" : "status-badge status-inactive"}>
                                    {employee.status}
                                </span>
                            </td>
                            <td>
                                <button onClick={() => onEdit(employee)}>Edit</button>
                                <button onClick={() => onDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default EmployeeTable;