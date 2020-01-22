from .Model.user import UserModel
from .Integration.userDAO import UserDAO


class Controller:
    userDAO = UserDAO()
    def registerUser(self,user):
        user = UserModel(user)
        self.userDAO.registerUser(user)


