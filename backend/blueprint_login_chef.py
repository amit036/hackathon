import csv
import json
import hashlib
from flask import Blueprint
from flask import request

login_chef = Blueprint("login_chef", __name__)


def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()


def read_user():
    user_data = list()
    with open('data/chefs.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            user_data.append(row)
    return user_data

def read_feedback():
    all_feedback = list()
    with open('data/feedback.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            all_feedback.append(row)
    return all_feedback

def read_comment():
    all_comment = list()
    with open('data/comments.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            all_comment.append(row)
    return all_comment

@login_chef.route('/need-job',methods=['GET'])
def need_job():
    chef_list = list()
    chef_list = read_user()
    need_job_chef = list()
    for user in chef_list:
        if user["look_for_job"] == "Yes":
            need_job_chef.append(user)
    return json.dumps(need_job_chef)

@login_chef.route('/need-not-job',methods=['GET'])
def need_not_job():
    chef_list = list()
    chef_list = read_user()
    not_job_chef = list()
    for user in chef_list:
        if user["look_for_job"] == "No":
            not_job_chef.append(user)
    return json.dumps(not_job_chef)

@login_chef.route('/login', methods=['POST'])
def login_valid():
    email = request.json["email"]
    password = request.json["password"]
    user_list = read_user()
    flag = False
    for user in user_list:
        if user["email"] == email and (md5_hash(password + user["salt"])) == user["password_hash"]:
            response = user["id"]
    return json.dumps(response)

@login_chef.route('/all-feedback/<int:cid>',methods=['POST'])
def all_feedback(cid):
    all_feedbacks = list()
    all_feedbacks = read_feedback()
    user_feedbacks = list()
    for row in all_feedbacks:
        if row["cid"] == cid:
            user_feedbacks.append(row)
    return json.dumps(user_feedbacks)

@login_chef.route('/all-comments/<int:cid>',methods=['POST'])
def all_comment(cid):
    all_comments = list()
    all_comments = read_comment()
    user_comments = list()
    for row in all_comments:
        if row["cid"] == cid:
            user_comments.append(row)
    return json.dumps(user_comments)

