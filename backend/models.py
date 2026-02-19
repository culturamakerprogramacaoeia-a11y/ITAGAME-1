from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='student') # admin, teacher, student
    
    # Atributos de Gamificação
    xp = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)
    coins = db.Column(db.Integer, default=0)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Mission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    xp_reward = db.Column(db.Integer, default=100)
    coin_reward = db.Column(db.Integer, default=10)
    subject = db.Column(db.String(50)) # Matemática, Empreendedorismo, etc.

class Achievement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    icon = db.Column(db.String(50)) # Nome do ícone (Lucide ou FontAwesome)
    description = db.Column(db.String(255))
