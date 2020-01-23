import secrets

class AuthToken:
    def generate(self):
        return secrets.token_urlsafe()
        