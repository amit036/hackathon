from flask import Flask
from blueprint_login_user import login_user
from blueprint_signup_user import signup_user
from blueprint_login_chef import login_chef
from blueprint_signup_chef import signup_chef
from blueprint_login_res import login_res
from blueprint_signup_res import signup_res
from blueprint_add_dish import add_dish
from blueprint_feedback import feedback
from blueprint_comment import comment
from blueprint_ratings import rating
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

app.register_blueprint(login_user, url_prefix="/user")
app.register_blueprint(signup_user, url_prefix="/user")
app.register_blueprint(login_chef, url_prefix="/chef")
app.register_blueprint(signup_chef, url_prefix="/chef")
app.register_blueprint(login_res, url_prefix="/restuarent")
app.register_blueprint(signup_res, url_prefix="/restuarent")
app.register_blueprint(add_dish, url_prefix="/chef")
app.register_blueprint(feedback,url_prefix="/user")
app.register_blueprint(comment,url_prefix="/user")
app.register_blueprint(rating,url_prefix="/user")

@app.route('/')
def home():
    print('Home')


if __name__ == "__main__":
    app.run()
