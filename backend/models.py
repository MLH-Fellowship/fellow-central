from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

db = SQLAlchemy()


class User(db.Model):
    """ Individual user (admin or fellow)"""
    __tablename__ = 'users'

    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    role = db.Column(db.String(), nullable=False)
    points_total = db.Column(db.Integer(), nullable=False)
    avatar = db.Column(db.String())

    def __init__(self, id, name, email, role, avatar):
        self.id = id
        self.name = name
        self.email = email
        self.role = role
        self.points_total = 0
        self.avatar = avatar


class Points(db.Model):
    """ Points earned by fellows """
    __tablename__ = 'points'

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    amount = db.Column(db.Integer(), nullable=False)
    assignee = db.Column(db.String(), db.ForeignKey(
        'users.id'), nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False,
                          server_default=func.now())
    description = db.Column(db.String(), nullable=False)
    event_id = db.Column(db.Integer(), db.ForeignKey('events.id'))

    # Relationships
    user = db.relationship('User', backref='points')
    event = db.relationship('Event', backref='points')

    def __init__(self, amount, assignee, description="Admin input", event_id=None):
        self.amount = amount
        self.assignee = assignee
        self.description = description
        self.event_id = event_id


class Event(db.Model):
    """ Event created by admins """
    __tablename__ = 'events'

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(), nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False)
    end_time = db.Column(db.DateTime(), nullable=False)
    secret_code = db.Column(db.String(), nullable=False)
    points_amount = db.Column(db.Integer(), nullable=False)
    event_link = db.Column(db.String(), nullable=False)
    vid_link = db.Column(db.String())

    def __init__(self, name, start_time, end_time, points_amount, secret_code, event_link, vid_link=None):
        self.name = name
        self.start_time = start_time
        self.end_time = end_time
        self.points_amount = points_amount
        self.secret_code = secret_code
        self.event_link = event_link
        self.vid_link = vid_link
