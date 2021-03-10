/** Database schemas
*   Entries of the database schema.
*   Users table is the collection of all available users of our app.
*   Events is the collection of all events during our Fellowship.
*   Points is the record of all the points earned for fellows.
*
*/

/** Roles Enum
*   Use an enum to prevent using varchar for user roles
*
*/

CREATE TYPE roles AS ENUM ('admin', 'fellow');

/** Users
*   
*
*/

CREATE TABLE Users (
    UserID INTEGER,
    DisplayName VARCHAR(255) NOT NULL,
    Role roles NOT NULL,
    Pod INTEGER NOT NULL,
    Points INTEGER NOT NULL,
    Email VARCHAR(255),
    PRIMARY KEY (UserID)
)

/** Events
*   SecretCode will likely follow LHD Build Convention
*   Description could be improved from being a varchar to just being a blob on the server
*
*/

CREATE TABLE Events (
    EventID INTEGER,
    Name VARCHAR(255) NOT NULL,
    Link VARCHAR(255) NOT NULL,
    StartTime TIMESTAMP WITH TIME ZONE NOT NULL,
    EndTime TIMESTAMP WITH TIME ZONE NOT NULL,
    Points VARCHAR(255) NOT NULL,
    SecretCode SMALLINT NOT NULL,
    Description VARCHAR(510),
    PRIMARY KEY (ID),
)

/** Points
*   Assignee has relation to User
*   Event has relation to Event
*   TimeStamp is time when secret code was entered. Useful for audit.
*
*/

CREATE TABLE Points (
    InstanceID INTEGER,
    Assignee NOT NULL,
    Event NOT NULL,
    TimeStamp TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (Instance),
    FOREIGN KEY (Assignee) REFERENCES Users(UserID),
    FOREIGN KEY (Event) REFERENCES Events(EventID)
)
