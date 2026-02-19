import sys
import os

# Adiciona o diretório do projeto ao path
path = '/home/username/ITAGAME/backend' # O PythonAnywhere vai precisar que você mude 'username'
if path not in sys.path:
    sys.path.append(path)

from app import app as application
