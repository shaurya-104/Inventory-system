from model import app,db,Items,userdata,logs
from flask import Flask,redirect,request,url_for,render_template,jsonify
from sqlalchemy import select

@app.route('/',methods=['GET','POST'])
def login():
    if request.method=='GET':
        return render_template('login.html')
    if request.method=='POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = userdata.query.filter_by(user_name=username).first()
        if user and user.password == password:
            if user.role == 'admin':
                return redirect(url_for('admin_dashboard'))
            elif user.role == 'employee':
                return redirect(url_for('employee'))
            else :
                return "user with this role is not present"
        else :
             return "Invalid info"
@app.route('/signup',methods=['GET','POST'])
def signup():
    if request.method == 'GET':
        return render_template('signup.html')
    if request.method == 'POST':
       username = request.form.get('username')
       password = request.form.get('password')
       role = request.form.get('role')
       key = request.form.get('key')
       if(key == "qwertyuiop" and role == 'admin'):
           new_user = userdata(user_name=username,role=role,password=password)
       elif role == 'employee':
           new_user = userdata(user_name=username,role=role,password=password)
       else :
           return "Invalid response"
       db.session.add(new_user)
       db.session.commit()
       return redirect(url_for('login'))
    
@app.route("/admin_Dashboard",methods=['GET'])
def admin_dashboard():
     return render_template('admin.html')

@app.route('/api/inventory/add',methods=['POST'])
def request_create():
    item_name = request.json.get('item_name')
    quantity = request.json.get('quantity')
    purchase_price = request.json.get('purchase_price')
    listing_price = request.json.get('listing_price')

    add_item = Items(item_name=item_name,quantity=quantity,purchase_price=purchase_price,listing_price=listing_price)
    db.session.add(add_item)
    db.session.commit()
    return jsonify({"status": "success", "message": "Item added to database!"})

@app.route('/api/inventory/edit',methods=['PATCH'])
def request_edit():
    item_name = request.json.get('item_name')
    quantity = request.json.get('quantity')
    purchase_price = request.json.get('purchase_price')
    listing_price = request.json.get('listing_price')
    user_id = request.json.get('id')

    user_edit = db.session.get(Items,user_id)
    if user_edit:
        user_edit.item_name = item_name
        user_edit.quantity = quantity
        user_edit.purchase_price = purchase_price
        user_edit.listing_price = listing_price
        db.session.commit()
        return jsonify({"status": "success", "message": "Item edited in database!"})
    return jsonify({"status": "error", "message": "Item not found"}), 404

@app.route('/api/inventory/delete', methods=['DELETE'])
def request_delete():
    data = request.json
    item_id = data.get('id')
    item_to_delete = Items.query.get(item_id)
    if item_to_delete:
        db.session.delete(item_to_delete)
        db.session.commit()
        return jsonify({"status": "success"})
    return jsonify({"status": "error", "message": "Item not found"}), 404
    
@app.route('/api/inventory')
def get_inventory():
    get_all_Items = Items.query.all()
    get_all_userdata = userdata.query.all()
    get_all_logs = logs.query.all()
    item_list = []
    user_list = []
    log = []
    for item in get_all_Items:
        item_list.append({
            'id': item.id,
            'item_name': item.item_name,
            'quantity': item.quantity,
            'purchase_price': item.purchase_price,
            'listing_price': item.listing_price
        })
    for item in get_all_userdata:
        user_list.append({
            'user_name' : item.user_name
        })
    for item in get_all_logs:
        log.append({
            'quantity_sold' : item.quantity_sold,
            'worker_name' : item.worker_name,
            'sold_item' : item.item_name,
            'selling_price' : item.selling_price         
        }) 
        
    return jsonify({
        'Inventory_data' :  item_list,
        'user_data' : user_list,
        'sell_logs' : log
    })

@app.route('/employee_Dashboard',methods=['GET'])
def employee():
    return render_template("employee.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
