class UserModel:
    username = ""
    password = ""
    email = ""
    date = ""
    firstName = ""
    lastName = ""
    
    def __init__(self,user):
        self.username = user.username
        self.password = user.password
        self.email = user.email
        self.date = user.date
        self.firstName = user.firstName
        self.lastName = user.lastName
       
    def printInfo(self):
        print(self.username +" " + self.password)