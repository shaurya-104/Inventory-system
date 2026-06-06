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

