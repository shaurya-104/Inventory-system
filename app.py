from model import app,db,Items,userdata,logs
from flask import Flask,redirect,request,url_for,render_template,jsonify

@app.route('/',methods=['GET','POST'])
def login():
    if request.method=='GET':
        return render_template('login.html')
    if request.method=='POST':
        role = request.form.get('role')
        username = request.form.get('username')
        password = request.form.get('password')

        user = userdata.query.filter_by(user_name=username).first()
        if user and user.password == password:
            if user.role == 'admin':
                return admin_dashboard()
            elif user.role == 'employee':
                return "hi employee"
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
    
@app.route("/admin_Dashboard",methods=['GET','POST'])
def admin_dashboard():
    if request.method == 'GET':
         return render_template('admin.html')
    if request.method == 'POST':




@app.route('/api/inventory')
def get_inventory():
    get_all_Items = Items.query.all()
    get_all_userdata = userdata.query.all()
    return jsonify({
        'Inventory_data' : get_all_Items,
        'user_data' : get_all_userdata
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)