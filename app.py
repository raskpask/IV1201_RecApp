from flask import Flask , make_response, send_from_directory
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api, reqparse

from Controller.controller import Controller
import os
import sys

app = Flask(__name__, static_folder='/build')

api = Api(app)


cors = CORS(app)
controller = Controller()
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
        return controller.registerUser(params) # returns the status code
        
class Login(Resource):

    def post(self):
        parser.add_argument('username')
        parser.add_argument('password')
        params = parser.parse_args()
        token = controller.generateAuthToken()
        if (controller.authenticateUser(params,token) == 200):
            resp = make_response()
            resp.set_cookie("authorization", value=token)
            resp.status_code = 200
            return resp 
        
        return 401

# class Site(Resource):
#     def root_dir(self):  # pragma: no cover
#         return os.path.abspath(os.path.dirname(__file__))

#     def get_file(self,filename):  # pragma: no cover
#         try:
#             src = os.path.join(self.root_dir(), filename)
#             # Figure out how flask returns static files
#             # Tried:
#             # - render_template
#             # - send_file
#             # This should not be so non-obvious
#             return open(src).read()
#         except IOError as exc:
#             return str(exc)

#     def get(self):
#         content = self.get_file('./build/index.html')
#         return make_response(content)

# class Serve(Resource):
#     def root_dir(self):  # pragma: no cover
#         return os.path.abspath(os.path.dirname(__file__))

#     def get_file(self,filename):  # pragma: no cover
#         try:
#             src = os.path.join(self.root_dir(), filename)
#             # Figure out how flask returns static files
#             # Tried:
#             # - render_template
#             # - send_file
#             # This should not be so non-obvious
#             return open(src).read()
#         except IOError as exc:
#             return str(exc)

#     def get(self,path):
#         content = self.get_file('./build/'+path)
#         return make_response(content)

# class ServePath(Resource):
#     def root_dir(self):  # pragma: no cover
#         return os.path.abspath(os.path.dirname(__file__))

#     def get_file(self,filename):  # pragma: no cover
#         try:
#             src = os.path.join(self.root_dir(), filename)
#             # Figure out how flask returns static files
#             # Tried:
#             # - render_template
#             # - send_file
#             # This should not be so non-obvious
#             return open(src).read()
#         except IOError as exc:
#             return str(exc)

#     def get(self,path1,path2,path3):
#         content = self.get_file('./build/'+path1+'/'+path2+'/'+path3)
#         return make_response(content)



# api.add_resource(Site,'/')
# api.add_resource(Serve,'/<path>')
# api.add_resource(ServePath,'/<path1>/<path2>/<path3>')
api.add_resource(User, '/api/user')
api.add_resource(Login, '/api/login')

if __name__ == '__main__':
    app.run()
