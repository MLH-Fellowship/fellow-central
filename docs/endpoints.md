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
        "timestamp": 2021-03-12 02:09:48.698096+00
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
