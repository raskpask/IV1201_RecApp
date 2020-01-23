import psycopg2
class UserDAO:
    user = "wlmremkduaitnk"
    password = "83a43bfb610544a9c62da56a7144bafb13a726bf63a91e7ec454178a9623b479"
    host = "ec2-54-247-92-167.eu-west-1.compute.amazonaws.com"
    port = "5432"
    db = "d38bijitre5o3s"
    pconn,cur = None,None
    def registerUser(self, user):
        self.open()    
        self.cur = self.pconn.cursor()
        self.cur.execute(f"INSERT INTO person (email,name,password,person_id,role_id,ssn,surname,username) VALUES('{user.email}','{user.firstName}','{user.password}',0,2,'{user.date}','{user.lastName}','{user.username}')")
        self.closeAndCommit()
        # self.getSometing()
        return "OK"

    def open(self):
        if self.pconn is not None and self.pconn.closed:
            self.pconn = None
            
        if self.pconn is None:
            self.pconn = psycopg2.connect(user=self.user, 
                                          password=self.password, 
                                          host=self.host, port=self.port, 
                                          database=self.db)
        if self.pconn is None:
            raise LMError(currargs='Unable to open connection to {}'.format(self.db))
    def closeAndCommit(self):
        self.pconn.commit()
        self.cur.close()
        self.pconn.close()

    def getSometing(self):
        self.cur =self.pconn.cursor()
        self.cur.execute("SELECT * FROM availability;")
        print(self.cur.fetchall())

