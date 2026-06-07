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
fetch('/api/inventory')
    .then(Response => {
        if(!Response.ok){
            throw new Error('Item data is not retrived')
        }
        else{
            return Response.json()
    }
})
    .then(data=>{
        const Inventory_data = data.Inventory_data
        const user_data = data.user_data
        const sell_logs = data.sell_logs
        const table = document.getElementById("inventoryTable")
    
    Inventory_data.forEach(item => {
            const newRow = table.insertRow(-1);

            const Id = newRow.insertCell(0);
            const Name = newRow.insertCell(1);
            const Quantity = newRow.insertCell(2);
            const Purchase = newRow.insertCell(3);
            const Listing = newRow.insertCell(4);
            const Actions = newRow.insertCell(5);
    })
})

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