from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'

db=SQLAlchemy(app)

class Items(db.Model):
    id = db.Column(db.Integer,primary_key=True,unique=True)
    item_name = db.Column(db.Text,unique=True,nullable=True)
    quantity = db.Column(db.Integer,nullable=True)
    purchase_price = db.Column(db.Float,nullable=True)
    listing_price = db.Column(db.Float,nullable=True)

    def __repr__(self):
        return f"the item at id {self.id} is {self.item_name} avaible are {self.quantity} for price {self.listing_price}"
    
class userdata(db.Model):
    id = db.Column(db.Integer,primary_key=True,unique=True)
    user_name = db.Column(db.Text,nullable=True)
    role = db.Column(db.Text,nullable=True)
    password = db.Column(db.Text,nullable=True)

    def __repr__(self):
        return f"the user at id {self.id} is {self.user_name} is {self.role}"
    
class logs(db.Model):
    id = db.Column(db.Integer,primary_key=True,unique=True)
    worker_name = db.Column(db.Text,nullable=True)
    selling_price = db.Column(db.Float,nullable=True)
    item_name = db.Column(db.Text,nullable=True)
    quantity_sold = db.Column(db.Integer,nullable=True)

    def __repr__(self):
        return f"{self.id}{self.worker_name}{self.selling_price}"
 
with app.app_context():
    db.create_all()
    print("database is sucessfully created")