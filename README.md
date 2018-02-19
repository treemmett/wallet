# Wallet

## API Documentation

* [Authentication](#login)
  * [Login](#login)
  * [Register](#register)
* [Add Transaction](#add-transaction)
* [Update Transaction](#update-transaction)

### Login

  Returns authentication token on successful Login

  * **URL**

    /api/auth

  * **Method**

    `POST`

  * **Data Params**

    **Required:**

    * `email` Email address
    * `password` Password

  * **Success Response**

    * **Code:** 200<br/>
    **Headers:** `{"Access-Token": "eyJhbGciOiJ..."}`<br/>
    **Body:** `{"success": true}`

  * **Error Responses**

    * **Code:** 400<br/>
    **Body:** `{"error": "missing_required_input", "message": "Missing required input"}`

    * **Code:** 400</br>
    **Body:** `{"error": 'invalid_credentials', "message": "Email or password is incorrect"}`

### Register

  Creates new user account, returns authentication token

  * **URL**

    /api/auth/register

  * **Method**

    `POST`

  * **Data Params**

    **Required:**

    * `email` Email address
    * `password` Password

  * **Success Response**

    * **Code:** 200<br/>
    **Headers:** `{"Access-Token": "eyJhbGciOiJ..."}`<br/>
    **Body:** `{"success": true}`

  * **Error Responses**

    * **Code:** 400<br/>
    **Body:** `{"error": "missing_required_input", "message": "Missing required input"}`

    * **Code:** 400</br>
    **Body:** `{"error": "email_in_use", "message": "Email is already registered"}`

### Get transactions

  Returns array of all transactions

  * **URL**

    /api/budget/transactions

  * **Method**

    `GET`

  * **Success Response**

    * **Code:** 200<br/>
    **Body:** `[{"id": "1234...", "amount": 87.32, "category": "groceries", "date": 1514764800, "payee": "Tom's groceries"}, {"id": "1234...", "amount": 21.63, "category": "transportation", "date": 1514764800, "payee": "Gas station"}]`

### Add transaction

  Adds new transaction to database, returns added transaction

  * **URL**

    /api/budget/transactions

  * **Method**

    `POST`

  * **Data Params**

    **Required:**

    * `amount` Dollar amount of transaction [number]
    * `category` Transaction category ID
    * `date` Date of transaction
    * `payee` Transaction recipient

    **Optional:**

    * `notes` Transaction notes

  * **Success Response**

    * **Code:** 200<br/>
    **Body:** `{"id": "1234...", "amount": 87.32, "category": "groceries", "date": 1514764800, "payee": "Tom's groceries"}`

  * **Error Responses**

    * **Code:** 400<br/>
    **Body:** `{"error": "missing_required_input", "message": "Missing required input"}`

    * **Code:** 400<br/>
    **Body:** `{"error": "invalid_data_type", "message": "Data type is incorrect"}`

### Update Transaction

  Updates data in an existing transaction

  * **URL**

    /api/budget/transactions/:transactionId

  * **Method**

    `PUT`

  * **URL Params**

    * `transactionId` ID of transaction to be updated

  * **Data Params**

    **Optional:**

    * `amount` Dollar amount of transaction [number]
    * `category` Transaction category ID
    * `date` Date of transaction
    * `payee` Transaction recipient
    * `notes` Transaction notes

  * **Success Response**

    * **Code:** 200</br>
    **Body:** `{"success": true}`

  * **Error Responses**

    * **Code:** 400</br>
    **Body:** `{"error":"invalid_transaction_id","message":"Transaction ID is invalid"}`

    * **Code:** 404</br>
    **Body:** `{"error":"transaction_id_not_found","message":"Transaction was not found"}`
