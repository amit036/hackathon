import csv
import json
import uuid
from flask import Blueprint
from flask import request

rating = Blueprint("rating", __name__)

def read_ratings():
    all_ratings = list()
    with open('data/ratings.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            all_ratings.append(row)
    return all_ratings

def write_ratings(rating_data):
    with open('data/ratings.csv', 'w') as csvfile:
        fieldnames = ['id', 'cid','user_id','rating']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for j in range(len(rating_data)):
            writer.writerow({
                'id': rating_data[j]["id"],
                'cid': rating_data[j]["cid"],
                'user_id': rating_data[j]["user_id"],
                'rating': rating_data[j]["rating"]
            })

@rating.route('/rating/<int:cid>',methods=['POST'])
def all_ratings(cid):
    rating_list = list()
    rating_list = read_ratings()
    uid = str(uuid.uuid1().int)[:5]
    rating = request.json["rating"]
    user_id = request.json["user_id"]
    rating_list.append({
        "id": uid,
        "cid": cid,
        'user_id': user_id,
        'rating': rating
    })     
    write_ratings(rating_list)
    response = "rated successfully"
    return json.dumps(response)

@rating.route('/rating/<int:cid>',methods=['GET'])
def particular_ratings(cid):
    rating_list = list()
    count = 0
    total_rating = 0
    ratings = 0
    rating_list = read_ratings()
    for i in rating_list:
        if int(i["cid"]) == cid:
            count += 1
            total_rating += int(i["rating"])
    if count == 0:
        count = 1
    ratings = round(total_rating/count,2)
    return json.dumps(ratings)