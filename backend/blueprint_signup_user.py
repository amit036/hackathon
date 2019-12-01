import csv
import json
import hashlib
import os
import uuid
from flask import Blueprint
from flask import request

signup_user = Blueprint("signup_user", __name__)


def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()


def generate_salt():
    salt = os.urandom(16)
    return salt.hex()


def read_user():
    user_data = list()
    with open('data/users.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            user_data.append(row)
    return user_data


def write_user(user_data):
    with open('data/users.csv', 'w') as csvfile:
        fieldnames = ['id', 'name', 'email', 'mobile', 'image', 'salt', 'password_hash']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for j in range(len(user_data)):
            writer.writerow({
                'id': user_data[j]["id"],
                'name': user_data[j]["name"],
                'email': user_data[j]["email"],
                'mobile': user_data[j]["mobile"],
                'image': user_data[j]["image"],
                'salt': user_data[j]["salt"],
                'password_hash': user_data[j]["password_hash"]
            })


@signup_user.route('/signup', methods=['POST'])
def register_user():
    user_list = list()
    user_list = read_user()
    flag = 0
    uid = str(uuid.uuid1().int)[:5]
    name = request.json["name"]
    email = request.json["email"]
    mobile = request.json["mobile"]
    image = request.json["image"]
    password = request.json["password"]
    for user in user_list:
        if user["email"] == email:
            flag = 1
    for i in range(10):
        salt = generate_salt()
    password_hash = md5_hash(password + salt)
    if flag == 0:
        user_list.append({
            "id": uid,
            "name": name,
            "email": email,
            "mobile": mobile,          
            "image": image,
            "salt": salt,
            "password_hash": password_hash
        })
        write_user(user_list)
        response = "Create Sucessfully"
    else:
        response = "User already exist"
    return json.dumps(response)
