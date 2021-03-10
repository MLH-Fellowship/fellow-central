-- Database schemas

-- Events
CREATE TABLE Events (
    Name,
    Link,
    StartTime,
    EndTime,
    Points,
    SecretCode,
    Description
)

-- Points
CREATE TABLE Points (
    Asignee,
    TimeStamp,
    Amount,
    Description,
)