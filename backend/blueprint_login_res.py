import csv
import json
import hashlib
from flask import Blueprint
from flask import request

login_res = Blueprint("login_res", __name__)


def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()


def read_user():
    user_data = list()
    with open('data/users.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            user_data.append(row)
    return user_data


@login_res.route('/login', methods=['POST'])
def login_valid():
    email = request.json["email"]
    password = request.json["password"]
    user_list = read_user()
    flag = False
    for user in user_list:
        if user["email"] == email and (md5_hash(password + user["salt"])) == user["password_hash"]:
            flag = True
    if flag == True:
        response = "Correct Credential"
    else:
        response = "Wrong Credential"
    return json.dumps(response)