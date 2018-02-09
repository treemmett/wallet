# Wallet

## API Documentation

* [Authentication](#login)
  * [Login](#login)
  * [Register](#register)

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

  Creates new user account and returns authentication token

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
