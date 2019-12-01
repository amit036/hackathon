import csv
import json
import uuid
from flask import Blueprint
from flask import request

feedback = Blueprint("feedback", __name__)

def read_feedback():
    all_feedback = list()
    with open('data/feedback.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            all_feedback.append(row)
    return all_feedback


def write_feedback(feedback_data):
    with open('data/feedback.csv', 'w') as csvfile:
        fieldnames = ['id', 'user_id', 'cid', 'feedback']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for j in range(len(feedback_data)):
            writer.writerow({
                'id': feedback_data[j]["id"],
                'user_id': feedback_data[j]["user_id"],
                'cid': feedback_data[j]["cid"],
                'feedback': feedback_data[j]["feedback"]
            })

@feedback.route('/feedback/<int:cid>',methods=['POST'])
def feedback_form(cid):
    feedback_list = list()
    feedback_list = read_feedback()
    uid = str(uuid.uuid1().int)[:6]
    user_id = request.json["user_id"]
    feedback = request.json["feedback"]
    feedback_list.append({
        "id": uid,
        "user_id":user_id,
        "cid": cid,
        "feedback": feedback
    })
    write_feedback(feedback_list)
    response = "Feedbacked"
    return json.dumps(response)

@feedback.route('/feedback/all-feedback/<int:cid>',methods=['POST'])
def all_feedback(cid):
    all_feedbacks = list()
    all_feedbacks = read_feedback()
    selected_feedbacks = list
    for row in all_feedbacks:
        if row["cid"] == cid:
            selected_feedbacks.append(row)
    return json.dumps(selected_feedbacks)

