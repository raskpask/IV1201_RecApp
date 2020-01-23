from .Model.user import UserModel
from .Integration.userDAO import UserDAO
from .Model.authToken import AuthToken


class Controller:
    userDAO = UserDAO()
    authToken = AuthToken()
    def registerUser(self,user):
        user = UserModel(user)
        return self.userDAO.registerUser(user)
    
    def authenticateUser(self,credentials,token):
        return self.userDAO.authenticateUser(credentials,token)
    
    def generateAuthToken(self):
        return self.authToken.generate()



