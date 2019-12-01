import csv
import json
import uuid
import hashlib
from flask import Blueprint
from flask import request

add_dish = Blueprint("add_dish", __name__)

def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()


def read_dish():
    dish_data = list()
    with open('data/all_dish.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            dish_data.append(row)
    return dish_data

def write_dish(dish_data):
    with open('data/all_dish.csv', 'w') as csvfile:
        fieldnames = ['id','cid','name','types','image','desc','process']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for j in range(len(dish_data)):
            writer.writerow({
                'id': dish_data[j]["id"],
                'cid':dish_data[j]['cid'],
                'name': dish_data[j]["name"],
                'types': dish_data[j]["types"],
                'image': dish_data[j]["image"],
                'desc': dish_data[j]["desc"],
                'process': dish_data[j]["process"]
            })
@add_dish.route('/list-dish',methods=['GET'])
def list_dist():
    dish_data = list()
    dish_data = read_dish()
    return json.dumps(dish_data)


@add_dish.route('/add-dish/<int:cid>',methods=['POST'])
def add_dishs(cid):
    dish_list = list()
    dish_list = read_dish()
    uid = str(uuid.uuid1().int)[:6]
    name = request.json["name"]
    types = request.json["types"]
    image = request.json["image"]
    desc = request.json["desc"]
    process = request.json["process"]
    dish_list.append({
        "id": uid,
        "cid": cid,
        "name": name,
        "types": types,
        "image": image,
        "desc": desc,
        "process": process
    })
    write_dish(dish_list)
    response = "Create Sucessfully"
    return json.dumps(response)

@add_dish.route('/show-dish/<int:id>',methods=['GET'])
def show_dishs(id):
    dish_list = list()
    dish_list = read_dish()
    show_list = list()
    for row in dish_list:
        if int(row["id"]) == int(id):
            show_list.append(row)
    return json.dumps(show_list[0])

@add_dish.route('/show-dish-chef/<int:cid>',methods=['GET'])
def show_dishs_chef(cid):
    dish_list = list()
    dish_list = read_dish()
    show_list = list()
    for row in dish_list:
        if int(row["cid"]) == int(cid):
            show_list.append(row)
    return json.dumps(show_list)



