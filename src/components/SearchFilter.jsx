function searchFilter({ 
    search,
    onSearchChange,
    department,
    status,
    onDepartmentChange,
    onStatusChange,
 }) {
    return (
        <div>
            <input
                type="text"
                placeholder="Search employees..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <select 
                value={department}
                onChange={(e) => onDepartmentChange(e.target.value)}
            >
                <option value="All">All Departments</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
            </select>

            <select 
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
            >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            
        </div>
    )
}

export default searchFilter;