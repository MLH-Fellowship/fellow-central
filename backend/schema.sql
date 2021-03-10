-- Database schemas

-- User

-- Events
CREATE TABLE Events (
    Name VARCHAR(255),
    Link VARCHAR(255),
    StartTime TIMESTAMP WITH TIME ZONE,
    EndTime TIMESTAMP WITH TIME ZONE,
    Points INTEGER,
    SecretCode SMALLINT, --Probably going to follow LHD Build convention
    Description VARCHAR(510), -- Could probably use a text based format instead of varchar, like referencing a file on server? I wouldn't know
)

-- Points
CREATE TABLE Points (
    Asignee, -- Relation to "User" although why can't we just name this "user"?
    Event, -- Relation to "Event"
    TimeStamp, -- Time when code was entered. Although, is this necessary?
    Amount, -- Probably redundant if we have a link to "Event"
    Description, -- Again, probably redundant
)