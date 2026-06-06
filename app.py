from model import app,db,Items,userdata,logs
from flask import Flask,redirect,request,url_for,render_template

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
                return"hello admin"
            elif user.role == 'employee':
                return "hi employee"
            else :
                return "user with this role is not present"
        else :
             return "Invalid info"
@app.route('/signup',method=['GET','POST'])
def signup():
    if request.method == 'GET':
        return render_template('signup')
    if request.post == 'POST':
       username = request.form.get('username')
       password = request.form.get('password')
       role = request.form.get('role')
       key = request.form.get('role')
       if(key == "qwertyuiop" and role == 'admin'):
           new_user = userdata(user_name=username,role=role,password=password)
       elif role == 'employee':
           new_user = userdata(user_name=username,role=role,password=password)
       else :
           return "Invalid response"
       db.session.add(new_user)
       db.session.commit()
    
if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)