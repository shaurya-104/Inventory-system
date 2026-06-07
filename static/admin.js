let currentEditId = null;
let currentDeleteId = null;

function openAdd() {
    document.getElementById("add").style.display = "block";
}
function closeAdd() {
    document.getElementById("add").style.display = "none";
}
function closedelete() {
    document.getElementById("delete").style.display = "none";
}
function closeedit() {
    document.getElementById("edit").style.display = "none";
}

function openEditModal(id, name, qty, purchase, listing) {
    currentEditId = id;
    document.getElementById("updateName").value = name;
    document.getElementById("updateQuantity").value = qty;
    document.getElementById("updatePurchase").value = purchase;
    document.getElementById("updateListing").value = listing;
    document.getElementById("edit").style.display = "block";
}

function confirmDelete(id) {
    currentDeleteId = id;
    document.getElementById("delete").style.display = "block";
}

fetch('/api/inventory')
    .then(Response => {
        if(!Response.ok){
            throw new Error('Item data is not retrieved');
        }
        return Response.json();
    })
    .then(data => {
        const Inventory_data = data.Inventory_data;
        const sell_logs = data.sell_logs;
        
        const table = document.getElementById("inventoryTable");
        const logsTable = document.getElementById("logsTable");
        
        let totalRevenueAmount = 0;
        let totalItemsSold = 0;
        let lowStockItems = 0;

        // --- 1. POPULATE INVENTORY & FLAG LOW STOCK ---
        Inventory_data.forEach(item => {
            const newRow = table.insertRow(-1);

            // Logic: If quantity is under 5, add class and increment counter
            if (item.quantity < 5) {
                newRow.classList.add("low-stock");
                lowStockItems++;
            }

            const Id = newRow.insertCell(0);
            const Name = newRow.insertCell(1);
            const Quantity = newRow.insertCell(2);
            const Purchase = newRow.insertCell(3);
            const Listing = newRow.insertCell(4);
            const Actions = newRow.insertCell(5);

            Id.innerHTML = item.id;
            Name.innerHTML = item.item_name;
            Quantity.innerHTML = item.quantity;
            Purchase.innerHTML = "₹" + item.purchase_price;
            Listing.innerHTML = "₹" + item.listing_price;
            Actions.innerHTML = `<button onclick="openEditModal(${item.id}, '${item.item_name}', ${item.quantity}, ${item.purchase_price}, ${item.listing_price})">Edit</button> <button onclick="confirmDelete(${item.id})">Delete</button>`;
        });

        // --- 2. POPULATE LOGS & CALCULATE MATH ---
        if (sell_logs) {
            sell_logs.forEach(log => {
                // Calculate totals
                totalRevenueAmount += (log.selling_price * log.quantity_sold);
                totalItemsSold += log.quantity_sold;

                // Build the logs table rows
                const newRow = logsTable.insertRow(-1);
                newRow.insertCell(0).innerHTML = log.worker_name || "Employee"; 
                newRow.insertCell(1).innerHTML = log.sold_item;
                newRow.insertCell(2).innerHTML = log.quantity_sold;
                newRow.insertCell(3).innerHTML = "₹" + log.selling_price;
            });
        }

        // --- 3. INJECT CALCULATIONS INTO HTML ---
        document.getElementById("totalRevenue").innerText = "₹" + totalRevenueAmount;
        document.getElementById("totalSold").innerText = totalItemsSold;
        document.getElementById("lowStockCount").innerText = lowStockItems;

        // --- 4. SEARCH FILTER LOGIC ---
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("keyup", function() {
                const filter = searchInput.value.toLowerCase();
                const rows = table.getElementsByTagName("tr");

                for (let i = 2; i < rows.length; i++) {
                    const itemNameCell = rows[i].getElementsByTagName("td")[1];
                    if (itemNameCell) {
                        const txtValue = itemNameCell.textContent || itemNameCell.innerText;
                        if (txtValue.toLowerCase().indexOf(filter) > -1) {
                            rows[i].style.display = ""; 
                        } else {
                            rows[i].style.display = "none";
                        }
                    }       
                }
            });
        }
    })
    .catch(error => console.error("Error loading inventory:", error));
const addForm = document.getElementById("addItemForm");
addForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const itemName = document.getElementById("newName").value;
    const itemQuantity = document.getElementById("newQuantity").value;
    const itemPurchase = document.getElementById("newPurchase").value;
    const itemListing = document.getElementById("newListing").value;

    fetch('/api/inventory/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "item_name": itemName,
            "quantity": itemQuantity,
            "purchase_price": itemPurchase,
            "listing_price": itemListing
        })
    })
    .then(Response => Response.json())
    .then(data => {
        closeAdd();              
        window.location.reload(); 
    })
    .catch(error => {
        console.error("Error adding item:", error);
    });
}); 
        
const editItemForm = document.getElementById('editItemForm');
editItemForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const itemNameupdate = document.getElementById("updateName").value;
    const itemQuantityupdate = document.getElementById("updateQuantity").value;
    const itemPurchaseupdate = document.getElementById("updatePurchase").value;
    const itemListingupdate = document.getElementById("updateListing").value;

    fetch('/api/inventory/edit', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "item_name": itemNameupdate,
            "quantity": itemQuantityupdate,
            "purchase_price": itemPurchaseupdate,
            "listing_price": itemListingupdate,
            "id": currentEditId
        })
    })
    .then(Response => Response.json())
    .then(data => {
        closeedit();              
        window.location.reload(); 
    })
    .catch(error => {
        console.error("Error editing item:", error);
    });
}); 

const deleteSubmit = document.getElementById("deleteSubmit");
deleteSubmit.addEventListener("click", function(event) {
    event.preventDefault();
    const choice = document.querySelector('input[name="choice"]:checked');
    
    if (choice && choice.value === "Yes") {
        fetch('/api/inventory/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": currentDeleteId
            })
        })
        .then(Response => Response.json())
        .then(data => {
            closedelete();              
            window.location.reload(); 
        })
        .catch(error => {
            console.error("Error deleting item:", error);
        });
    } else {
        closedelete();
    }
});
