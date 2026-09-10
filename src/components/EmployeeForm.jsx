import { useState } from "react";

function EmployeeForm({ onSave, employee }) {

    const [formData, setFormData] = useState(
        employee ||{
        name: "",
        email: "",
        department: "",
        role: "",
        status: "Active",
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if(!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if(!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if(!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if(!formData.department.trim()) {
            newErrors.department = "Department is required";
        }

        if(!formData.role.trim()) {
            newErrors.role = "Role is required";
        }

        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setErrors({});
        onSave(formData);
    
    }
    

    return (
        <form className="employee-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter employee email"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
            </div>
            <div className="form-group">
                <label>Department:</label>
                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                >
                    <option value="Select Department">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                </select>
                {errors.department && <p className="form-error">{errors.department}</p>}
            </div>
            <div className="form-group">
                <label>Role:</label>
                <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Enter employee role"
                />
                {errors.role && <p className="form-error">{errors.role}</p>}
            </div>
            <div className="form-group">
                <label>Status:</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <button className="primary-button" type="submit">Save Employee</button>

        </form>
    )
};

export default EmployeeForm;