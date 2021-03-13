# API Endpoints

## **POST** `/points/add`

### Input

```HTTP
POST /points/add HTTP/1.1
Host: 127.0.0.1:5000
Content-Type: application/json

{
    "amount": 10,
    "assignee": "123456789",
    "description": "Discord"
}
```

### Data Attributes:

- _amount_ : the amount of points to add
- _assignee_ : the discord_id of the user to assign points to
- _description_ : string to describe why points were allocated ("Discord" for discord activity, "Event" for event attendance, otherwise custom)
- _event_id_ (optional): the id of the event (if description is "Event")
- _secret_input_ (optional): the user's input for event secret code (if description is "Event")

### Output

Example successful output

```json
{
    "success": true,
    "message": "Points added for Discord activity",
    "data": {
        "id": 1,
        "amount": 10,
        "assignee": "123456789",
        "description": "Discord",
        "event_id": null,
        "timestamp": "2021-03-12 02:09:48.698096+00"
    }
}
```

Example unsuccessful output

```json
{
  "success": false,
  "message": "Daily limit reached."
}
```

---

## **GET** `/get_user`

### Input

```HTTP
GET /get_user HTTP/1.1
Host: 127.0.0.1:5000
Authorization: Bearer xxxx.yyyy.zzzz
```

### Output

Example successful output

```json
{
    "success": true,
    "message": "User found",
    "data": {
        "email": "test@email.com",
        "id": "123456",
        "name": "test#1234",
        "points_total": 10,
        "role": "admin"
    }
}
```

Example unsuccessful output

```json
{
    "success": false,
    "message": "User not found"
}
```

---

## **GET** `/get_events`

### Input

```HTTP
GET /get_events HTTP/1.1
Host: 127.0.0.1:5000
Authorization: Bearer xxxx.yyyy.zzzz
```

### Output

Example successful output

```json
{
    "success": true,
    "message": "Events fetched successfully",
    "data": [
        {
            "name": "Test",
            "points_amount": 10,
            "secret_code": "SecretCode",
            "start_time": "Sat, 06 Mar 2021 19:44:00 GMT",
            "end_time": "Sat, 06 Mar 2021 19:44:00 GMT",
            "event_link": "https://twitch.tv/MLH/329920034",
            "vid_link": null
        }
    ]
}
```

Example unsuccessful output

```json
{
    "success": false,
    "message": "Error: ERROR_MESSAGE"
}
```

---