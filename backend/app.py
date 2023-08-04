from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb+srv://harry:pVR815eAl4tMBxEw@cluster0.faflnvk.mongodb.net/')
db = client['tatya']
users_collection = db['users']

@app.route('/register', methods=["GET",'POST'])
def register():
    user_data = request.json
    username = user_data['username']
    email = user_data['email']
    password = user_data['password']
    password2=user_data["password2"]
    key=user_data["key"]
    seckey=user_data["s_key"]
    amount=50
    

    # Check if the username or email already exists in the database
    

    # Create a new user document
    new_user = {
        'username': username,
        'email': email,
        'password': password,
        "password2":password2,
        "amount":amount,
        "api_key":key,
        "s_api_key":seckey
    }

    # Insert the new user document into the database
    result = users_collection.insert_one(new_user)

    return jsonify({'message': 'User registered successfully'}), 200


@app.route('/login', methods=["GET",'POST'])
def login():
    user_data = request.json
    username = user_data['username']
    password = user_data['password']
    password2 = user_data['password2']

    # Check if the username and password match a user in the database
    user = users_collection.find_one({'username': username, 'password': password, "password2":password2})
    if user:
        return jsonify({'message': 'Login successful'}), 200

    return jsonify({'message': 'Invalid username or password'}), 401


@app.route('/paytime', methods=["GET",'POST'])
def paytime():
    user_data = request.json
    username = user_data['username']
    password = user_data['password']
    password2 = user_data['password2']
    amount = user_data["amount"]
    M_name = user_data['M_name']
    M_pass = user_data['M_pass']
    M_pass2 = user_data['M_pass2']

    # Check if the username and password match a user in the database
    user = users_collection.find_one({'username': username, 'password': password,"password2":password2})
    if user:
        documents = users_collection.find({"username": M_name,"password":M_pass,"password2":M_pass2})
        for document in documents:
            money_Main = document["amount"]

            print("Money:", money_Main)

        documents2 = users_collection.find({"username": username,"password":password,"password2":password2})
        for document in documents2:
            money_sec = document["amount"]
            print("Money2:", money_sec)

        documents3 = users_collection.find({"username": "admin","password":"admin","password2":"2345"})
        for document in documents3:
            money_a = document["amount"]
            print("Money3:", money_a)
        
        pay=float(amount)
        per=math.ceil(0.005*pay)
        if pay < 0:
            print("amount cannot be negative")
        elif pay>money_sec:
            print("Amount is exceeded")
        else:
            new_m1=money_sec-pay-per
            
            new_m2=money_Main+pay
            new_m3=money_a+per

            result1 = users_collection.update_one({"username": M_name,"password":M_pass,"password2":M_pass2}, {"$set": {"amount": new_m2}})
            result2 = users_collection.update_one({"username": username,"password":password,"password2":password2}, {"$set": {"amount": new_m1}})
            result3 = users_collection.update_one({"username": "admin","password":"admin","password2":"2345"}, {"$set": {"amount": new_m3}})

        return jsonify({'message': 'Login successful'}), 200

    return jsonify({'message': 'Invalid username or password'}), 401


@app.route('/home/<namex>/<passw>/<passw2>', methods=["GET",'POST'])
def home(namex,passw,passw2):
    documents2 = users_collection.find({"username": namex,"password":passw,"password2":passw2})
    for document in documents2:
        money_sec = document["amount"]
        key1=document["api_key"]
        s_key2=document["s_api_key"]
        print("Money:", money_sec)
        
    data={"money":money_sec,"age":0,"key1":key1,"s_key2":s_key2}
    return jsonify(data)

@app.route('/gettoken', methods=["GET",'POST'])
def gettoken():
    user_data = request.json
    username = user_data['username']
    password = user_data['password']
    password2=user_data["password2"]
    amount=user_data["amount"]
    amount=int(amount)
    documents2 = users_collection.find({"username": username,"password":password,"password2":password2})
    for document in documents2:
            money_sec = document["amount"]
            print("Money2:", money_sec)
    # Insert the new user document into the database

    amount=amount+money_sec
    result1 = users_collection.update_one({"username": username,"password":password,"password2":password2}, {"$set": {"amount": amount}})

    return jsonify({'message': 'User registered successfully'}), 200

@app.route('/redeemtoken', methods=["GET",'POST'])
def redeemtoken():
    user_data = request.json
    username = user_data['username']
    password = user_data['password']
    password2=user_data["password2"]
    amount=user_data["amount"]
    amount=int(amount)
    documents2 = users_collection.find({"username": username,"password":password,"password2":password2})
    for document in documents2:
            money_sec = document["amount"]
            print("Money2:", money_sec)
    # Insert the new user document into the database

    amount=money_sec-amount
    result1 = users_collection.update_one({"username": username,"password":password,"password2":password2}, {"$set": {"amount": amount}})

    return jsonify({'message': 'User registered successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
