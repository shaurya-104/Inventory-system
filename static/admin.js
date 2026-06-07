function open() {
    document.getElementById("add").style.display = "block";
}
function close() {
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
        const sell_logs =data.sell_logs
        const table = document.getElementById("inventoryTable")
    
    Inventory_data.forEach(item => {
            const newRow = table.insertRow(-1);

            const Id = newRow.insertCell(0);
            const Name = newRow.insertCell(1);
            const Quantity = newRow.insertCell(2);
            const Purchase = newRow.insertCell(3);
            const Listing = newRow.insertCell(4);
            const Delete = newRow.insertCell(5);
            const edit = newRow.insertCell(6);  

            Id.innerHTML = item.id;
            Name.innerHTML = item.item_name;
            Quantity.innerHTML = item.quantity;
            Purchase.innerHTML = "₹" + item.purchase_price;
            Listing.innerHTML = "₹" + item.listing_price;
            Delete.innerHTML = `<button onclick="confirmDelete(${item.id})">Delete</button>`;
            edit.innerHTML = `<button onclick="openEditModal(${item.id})">Edit</button>`;
            
            Delete.addEventListener('click',function(){
                const Yes = document.getElementById('Yes')
                const No = document.getElementById('No')
                document.getElementById("delete").style.display = "block";

            })
            
    });
    user.data.forEach(item=>{
        const ussername = item.user_name
    })
    sell_logs.forEach(item=>{
        const quantity_sold = item.quantity_sold
        const worker_name = item.worker_name
        const sold_item = item.item_name
        const selling_price = item.selling_price 
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
        console.log(data.message); 
        closeModal();              
        window.location.reload(); 
    })
    .catch(error => {
        console.error("Error adding item:", error);
    });
}); 
        
edit.addEventListener("click", function(event) {
    event.preventDefault();
    const itemNameupdate = document.getElementById("updateName").value;
    const itemQuantityupdate = document.getElementById("updateQuantity").value;
    const itemPurchaseupdate = document.getElementById("updatePurchase").value;
    const itemListingupdate = document.getElementById("updateListing").value;
    const editItemForm = document.getElementById('editItemForm').value;

    fetch('/api/inventory/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "item_name": itemName,
            "quantity": itemQuantity,
            "purchase_price": itemPurchase,
            "listing_price": itemListing,
            "user_id" : id
        })
    })
        .then(Response => Response.json())
    .then(data => {
        console.log(data.message); 
        closeModal();              
        window.location.reload(); 
    })
    .catch(error => {
        console.error("Error adding item:", error);
    });
}); 

Delete.addEventListener("click",fucntion(event))
    