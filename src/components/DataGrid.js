import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import customersData from '../data/customers.json';

const DataGrid = () => {
    const [customers, setCustomers] = useState(customersData); // State for customer data
    const [selectedRows, setSelectedRows] = useState([]);  // State for selected rows
    const [search, setSearch] = useState('');  // State for search input

    const columns = [
        {
            name: 'Customer',
            selector: row => row.customer,
            sortable: true,
        },
        {
            name: 'Last seen',
            selector: row => row.last_seen,
            sortable: true,
        },
        {
            name: 'Orders',
            selector: row => row.orders,
            sortable: true,
        },
        {
            name: 'Total spent',
            selector: row => row.total_spent,
            sortable: true,
        },
        {
            name: 'Last purchase',
            selector: row => row.last_purchase,
            sortable: true,
        },
        {
            name: 'News',
            selector: row => (row.news ? '✔' : '✖'),
            sortable: true,
        },
        {
            name: 'Segments',
            selector: row => row.segments,
            sortable: true,
        },
    ];

    // Handle search by filtering customers based on search input
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);

        const filteredCustomers = customersData.filter(customer =>
            customer.customer.toLowerCase().includes(value) ||
            customer.last_seen.toLowerCase().includes(value) ||
            customer.orders.toString().includes(value) ||
            customer.total_spent.toLowerCase().includes(value) ||
            customer.last_purchase.toLowerCase().includes(value) ||
            (customer.news ? '✔' : '✖').toLowerCase().includes(value) ||
            customer.segments.toLowerCase().includes(value)
        );

        setCustomers(filteredCustomers); // Update state with filtered customers
    };

    // Handle row selection
    const handleRowSelected = (state) => {
        setSelectedRows(state.selectedRows);
    };

    // Handle deleting selected rows
    const handleDeleteSelected = () => {
        const updatedCustomers = customers.filter(customer => 
            !selectedRows.includes(customer)
        );
        setCustomers(updatedCustomers);  // Update state to remove selected customers
        setSelectedRows([]);  // Clear the selected rows
    };

    return (
        <div>
            <h2>Customer DataGrid</h2>

            {/* Search input */}
            <input 
                type="text" 
                placeholder="Search by any parameter" 
                value={search} 
                onChange={handleSearch} 
                style={{ marginBottom: '10px', padding: '5px' }}
            />

            {/* Delete button for selected rows */}
            <button onClick={handleDeleteSelected} disabled={selectedRows.length === 0} style={{ marginBottom: '10px', padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
                Delete Selected
            </button>

            <DataTable
                columns={columns}
                data={customers}
                defaultSortField="customer"
                pagination
                highlightOnHover
                selectableRows // Enable row selection
                onSelectedRowsChange={handleRowSelected}  // Event when row selection changes
                selectableRowsHighlight
            />
        </div>
    );
};

export default DataGrid;
