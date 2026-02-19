from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
import os

app = Flask(__name__)
CORS(app)

# Configurações para PythonAnywhere / Local
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///itagame.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret-key-mudar-depois' # Mudar em produção

db = SQLAlchemy(app)
jwt = JWTManager(app)

@app.route('/')
def home():
    return jsonify({"message": "ITAGAME API 2.0 - Online"}), 200

# Endpoint de teste para Gamificação
@app.route('/api/stats', methods=['GET'])
def get_stats():
    # Simulação de dados para o Dashboard
    return jsonify({
        "xp": 1250,
        "level": 5,
        "next_level_xp": 2000,
        "rank": 12,
        "achievements": 8
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
