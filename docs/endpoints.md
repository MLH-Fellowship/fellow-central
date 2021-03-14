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

## **POST** `/admin/create_event`

### Input

```HTTP
POST /admin/create_event HTTP/1.1
Host: 127.0.0.1:5000
Content-Type: application/json

{
    "name": "Starting out in tech before you graduate college",
    "start_time": "2021-03-06T19:44",
    "end_time": "2021-03-06T19:44",
    "points_amount": 120,
    "secret_code": "ShhhThisIsASecretCodeDontTellHarambe",
    "event_link": "twitch.tv/mlh/2388hfisk-3ji23-sjj23k"
}
```

### Data Attributes:

- _name_ : the name of the event
- _start\_time_ : the start time, specified in js time format
- _end\_time_ : the end time, specified in js time format
- _points\_amount_ : integer for points to be awarded
- _secret\_code_ : code that will be provided to fellows who attend an event, so that they can enter it later
- _event\_link_ : a link to the event so fellows can attend and collaborate, learn!

### Output

Example successful output

```json
{
    "success": true,
    "message": "Event successfully created.",
    "id": event_id
}
```

Example unsuccessful output

```json
{
  "success": false,
  "message": "Server Error. Could not commit to database"
}
```

---

## **GET** `/get_total_registered_fellows`

### Input

```HTTP
POST /get_total_registered_fellows HTTP/1.1
Host: 127.0.0.1:5000
Content-Type: application/json
```

### Output

Example successful output

```json
{
    "success": true,
    "message": "Number of fellows retrieved successfully",
    "data": 193
}
```

Example unsuccessful output

```json
{
    "success": false,
    "message": "Error: <ERROR_MESSAGE>"
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
        "role": "admin",
        "avatars_url": "https://cdn.discordapp.com/avatars/579132343764254758/4d94893dd9d0c345cc843a1159152525.png?size=128"
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

## **GET** `/get_points_history`

### Input

```HTTP
GET /get_points_history?n=2 HTTP/1.1
Host: 127.0.0.1:5000
```

### Params Attributes:
- _n_ : number of Points to fetch

### Output

Example successful output

```json
{
    "success": true,
    "message": "Points history fetched successfully",
    "data": [
        {
            "amount": 1,
            "assignee": "test#1234",
            "description": "Discord",
            "event_id": null,
            "timestamp": "Sat, 13 Mar 2021 05:27:28 GMT"
        },
        {
            "amount": 10,
            "assignee": "test2#5678",
            "description": "Event",
            "event_id": 4,
            "timestamp": "Sat, 13 Mar 2021 04:35:47 GMT"
        }
    ]
}
```

Example unsuccessful output

```json
{
    "success": false,
    "message": "Error: <ERROR_MESSAGE>"
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

Example unsuccessful output

```json
{
    "success": false,
    "message": "Error: <ERROR_MESSAGE>"
}
```
    
## **GET** `/get_top_fellows`

### Input

```HTTP
GET /get_top_fellows?n=2 HTTP/1.1
Host: 127.0.0.1:5000
```

### Param Attributes:
- - _n_ : number of fellows to fetch

### Output

Example successful output

```json
{
    "success": true,
    "message": "Top fellows fetched successfully",
    "data": [
        {
            "name": "test#1234",
            "points_total": 17
        },
        {
            "name": "test2#5678",
            "points_total": 13
        }
    ]
}
```

Example unsuccessful output

```json
{
    "success": false,
    "message": "Error: <ERROR_MESSAGE>"
}
```

---

---

## **GET** `/get_pod_points`

### Input

```HTTP
GET /get_pod_points HTTP/1.1
Host: 127.0.0.1:5000
Authorization: Bearer xxxx.yyyy.zzzz
```

### Output

Example successful output

```json
{
    "success": true,
    "message": "Pod found.",
    "Pod 0.0.1": 342
}
```

Example unsuccessful output

```json
{
  "success": false,
  "message": "Pod not found."
}
```

---
