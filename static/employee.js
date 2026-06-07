fetch('/api/inventory')
    .then(response=>{
        if(!response.ok){
            throw new Error('Item is not fetched')
        }
        else{
            return response.json()
        }
    })
    .then(data=>{
        const Inventory_data = data.Inventory_data
        const table = document.getElementById("inventoryTable")
    
    Inventory_data.forEach(item => {
            const newRow = table.insertRow(-1);

            const Id = newRow.insertCell(0);
            const Name = newRow.insertCell(1);
            const Quantity = newRow.insertCell(2);
            const Listing = newRow.insertCell(3);

            Id.innerHTML = item.id;
            Name.innerHTML = item.item_name;
            Quantity.innerHTML = item.quantity;
            Listing.innerHTML = "₹" + item.listing_price;
    });
    })