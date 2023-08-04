import pymongo

from pymongo import MongoClient

# Establish a connection to MongoDB
client = MongoClient('mongodb://localhost:27017')

# Access a database
db = client['finpro']
print("login for dukaandar")
f_id1=int(input("Enter dukaandar pin: "))
s_id1=input("Enter dukaandar fingerprint: ")

collection = db['finpro']
documents = collection.find({"f_id": f_id1,"s_id":s_id1})
for document in documents:
    money1 = document["amount"]
    print("Money:", money1)


print("Customer section auth:  ")

f_id2=int(input("Enter customer pin: "))
s_id2=input("Enter customer fingerprint: ")

documents1 = collection.find({"f_id": f_id2,"s_id":s_id2})
for document in documents1:
    money2 = document["amount"]
    print("Money:", money2)

pay=int(input("Enter amount to transfer: "))
if pay<0:
    print("amount cannot be negative")
elif pay>money2:
    print("Amount is exceeded")
else:
    new_m1=money2-pay
    
    new_m2=money1+pay

    result1 = collection.update_one({"f_id": f_id1,"s_id":s_id1}, {"$set": {"amount": new_m2}})
    result2 = collection.update_one({"f_id": f_id2,"s_id":s_id2}, {"$set": {"amount": new_m1}})
    print("")
    print("")
    print("")
    print("")
    documents3 = collection.find({"f_id": f_id1,"s_id":s_id1})
    for document in documents3:
        money3 = document["amount"]
        print("Money of dukaandar:", money3)

    print("")
    print("")
    print("")
    print("")
    documents4 = collection.find({"f_id": f_id2,"s_id":s_id2})
    for document in documents4:
        money4 = document["amount"]
        print("Money of customer:", money4)
