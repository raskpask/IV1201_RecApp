class UserModel:
    username = ""
    password = ""
    email = ""
    date = ""
    firstName = ""
    lastName = ""
    
    def __init__(self,username,password,email,date,firstName,lastName):
        self.username = username
        self.password = password
        self.email = email
        self.date = date
        self.firstName = firstName
        self.lastName = lastName
    
    def registerInDB(self):
        
    def printInfo(self):
        print(self.username +" " + self.password)