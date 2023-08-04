import razorpay

#  key: "rzp_test_3c0rgFHcYyF1no",
#         key_secret:"1k7W0AYA2KfLrs368KEeyMXk",

# Step 3: Create a Razorpay client
client = razorpay.Client(auth=('rzp_test_3c0rgFHcYyF1no', '1k7W0AYA2KfLrs368KEeyMXk'))

# Step 4: Initialize the payment details
amount = 1000  # Amount in paise (e.g., 1000 paise = Rs. 10)
currency = 'INR'  # Currency code (e.g., INR for Indian Rupees)
notes = {'description': 'Payment for goods/services'}  # Additional notes (optional)

# Step 5: Create the payment order
payment_order = client.order.create({
    'amount': amount,
    'currency': currency,
    'notes': notes
})

# Step 6: Retrieve the payment order ID
order_id = payment_order['id']

# Step 7: Initiate the payment transfer
transfer = client.transfer.create({
    'account': 'KF0bF6FOFg5ynI',  # Receiver's Razorpay account ID
    'amount': amount,
    'currency': currency,
    'notes': notes,
    'linked_account_notes': {'description': 'Payment transfer'}
})

# Step 8: Retrieve the transfer ID
transfer_id = transfer['id']

# Step 9: Confirm the transfer and complete the payment
client.transfer.confirm(transfer_id)

print("Payment transfer successful!")
