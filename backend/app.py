from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api, reqparse

from Model.user import UserModel

app = Flask(__name__)
api = Api(app)

# CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

parser = reqparse.RequestParser()





class User(Resource):
    
    def getRegiserParams(self):
        parser.add_argument('username')
        parser.add_argument('password')
        parser.add_argument('email')
        parser.add_argument('date')
        parser.add_argument('lastName')
        parser.add_argument('firstName')

    def get(self):
        return "get"

    def post(self):
        self.getRegiserParams()
        params = parser.parse_args()
        print(params)
        user = UserModel(
            params.username,
            params.password,
            params.email,
            params.date,
            params.firstName,
            params.lastName
            )
        user.printInfo()
        

        return "OK", 200


api.add_resource(User, '/user')

if __name__ == '__main__':
    app.run()
