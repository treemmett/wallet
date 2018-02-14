# Wallet

## API Documentation

* [Authentication](#login)
  * [Login](#login)
  * [Register](#register)
* [Add Transaction](#add-transaction)

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
    * `date` Date-time of transaction in Unix time [number]
    * `payee` Transaction recipient

  * **Success Response**

    * **Code:** 200<br/>
    **Body:** `{"_id": "1234...", "amount": 87.32, "category": "groceries", "date": 1514764800, "payee": "Tom's groceries"}`

  * **Error Response**

    * **Code:** 400<br/>
    **Body:** `{"error": "missing_required_input", "message": "Missing required input"}`

    * **Code:** 400<br/>
    **Body:** `{"error": "invalid_data_type", "message": "Data type is incorrect"}`
