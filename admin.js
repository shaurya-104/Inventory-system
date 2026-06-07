fetch('/api/inventory')
    .then(Response => {
        if(!Response.ok){
            throw new Error('Item data is not retrived')
        }
        else{
        Response.json()
    }})
    .then(data=>{
        const item_name = data.Inventory_data.item_name
        const id_itemn = data.Inventory_data.id
        const purchase_price = data.Inventory_data.purchase_price
        const listing_price = data.Inventory_data.listing_price
        
        const ussername = data.user_data.user_name
        
        const quantity_sold = data.user.sell_logs.quantity_sold
        const worker_name = data.user.sell_logs.worker_name
        const sold_item = data.user.sell_logs.item_name
        const selling_price = data.user.sell_logs.selling_price
    })