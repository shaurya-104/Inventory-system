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
    
    Inventory_data.array.forEach(item => {
            const newRow = table.insertRow(-1);

            const cellId = newRow.insertCell(0);
            const cellName = newRow.insertCell(1);
            const cellQuantity = newRow.insertCell(2);
            const cellPurchase = newRow.insertCell(3);
            const cellListing = newRow.insertCell(4);

            cellId.innerHTML = item.id;
            cellName.innerHTML = item.item_name;
            cellQuantity.innerHTML = item.quantity;
            cellPurchase.innerHTML = "$" + item.purchase_price;
            cellListing.innerHTML = "$" + item.listing_price;
    });
    user.data.forEach.forEach(item=>{
        const ussername = item.user_name
    })
    sell_logs.forEach(item=>{
        const quantity_sold = item.quantity_sold
        const worker_name = item.worker_name
        const sold_item = item.item_name
        const selling_price = item.selling_price 
    })
})


        
        
