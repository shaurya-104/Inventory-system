fetch('/api/inventory')
    .then(Response => {
        if(!Response.ok){
            throw new Error('Item data is not retrived')
        }
        else{
        Response.json()
    }
})
    .then(data=>{
        const Inventory_data = data.Inventory_data
        const user_data = data.user_data
        const sell_logs =data.sell_logs
    
    Inventory_data.array.forEach(item => {
        const item_name = item.item_name
        const id_itemn = item.id
        const purchase_price = item.purchase_price
        const listing_price = item.listing_price 
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


        
        
