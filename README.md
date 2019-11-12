# Usage
Hit the `authentication` url:

**`POST`** `http://localhost:3000/authenticate`

then use the returned **Token** for the other API endpoints

# Headers
* `Authorization`
* `X-Access-Token`

# Routes
* **`POST`** `/authenticate`
* **`GET`** `/api/:table[?columns=column1,column2]`
* **`GET`** `/api/:table/:id[?columns=column1,column2]`
* **`POST`** `/api/:table`
* **`PUT`** `/api/:table`
* **`DELETE`** `/api/:table/:id`
