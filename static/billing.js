let cart = [];
let totalAmount = 0;
let inventoryData = [];

fetch('/api/inventory')
    .then(response => response.json())
    .then(data => {
        inventoryData = data.Inventory_data;
        const select = document.getElementById("itemSelect");
        inventoryData.forEach(item => {
            let option = document.createElement("option");
            option.value = item.id;
            option.text = `${item.item_name} (Stock: ${item.quantity}) - ₹${item.listing_price}`;
            select.appendChild(option);
        });
    });

function addToCart() {
    const id = document.getElementById("itemSelect").value;
    const qty = parseInt(document.getElementById("qtyInput").value);
    const item = inventoryData.find(i => i.id == id);

    if (item && qty > 0 && qty <= item.quantity) {
        const lineTotal = item.listing_price * qty;
        cart.push({ id: item.id, name: item.item_name, price: item.listing_price, qty: qty });
        totalAmount += lineTotal;

        document.getElementById("cartList").innerHTML += `<li>${item.item_name} x ${qty} = ₹${lineTotal}</li>`;
        document.getElementById("finalTotal").innerText = `Total: ₹${totalAmount}`;
    } else {
        alert("Invalid quantity or out of stock!");
    }
}

function checkout() {
    fetch('/api/process_sale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, total: totalAmount })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        window.location.href = "/employee_Dashboard"; 
    });
}