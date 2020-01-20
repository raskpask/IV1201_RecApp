from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)

# CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

@app.route('/')
def res():
    return "res"

@app.route('/test')
def hello():
    return "Hello World!"

if __name__ == '__main__':
    app.run()