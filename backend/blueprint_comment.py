import csv
import json
import uuid
from flask import Blueprint
from flask import request

comment = Blueprint("comment", __name__)

def read_comment():
    all_comment = list()
    with open('data/comments.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            all_comment.append(row)
    return all_comment


def write_comment(comment_data):
    with open('data/comments.csv', 'w') as csvfile:
        fieldnames = ['id', 'user_id', 'cid', 'comment']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for j in range(len(comment_data)):
            writer.writerow({
                'id': comment_data[j]["id"],
                'user_id': comment_data[j]["user_id"],
                'cid': comment_data[j]["cid"],
                'comment': comment_data[j]["comment"]
            })

@comment.route('/comments/<int:cid>',methods=['POST'])
def all_comments(cid):
    comment_list = list()
    comment_list = read_comment()
    uid = str(uuid.uuid1().int)[:6]
    user_id = request.json["user_id"]
    comment = request.json["comment"]
    comment_list.append({
        "id": uid,
        "user_id":user_id,
        "cid": cid,
        "comment": comment
    })
    write_comment(comment_list)
    response = "commented"
    return json.dumps(response)

@comment.route('/comments/<int:cid>',methods=['GET'])
def show_comments(cid):
    comment_list = list()
    comment_list = read_comment()
    all_comments = list()
    for i in comment_list:
        if int(i["cid"]) == cid:
            all_comments.append(i)
    return json.dumps(all_comments)

