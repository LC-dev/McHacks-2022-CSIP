from re import T
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pymongo
from pymongo import MongoClient
import certifi
from bson.json_util import dumps, loads
from bson import json_util

app = Flask(__name__)

ca = certifi.where()

client=MongoClient("mongodb+srv://paulhinta:cP3&bG32@cluster0.xov9o.mongodb.net/Queries?retryWrites=true&w=majority", tlsCAFile=ca)
#At the end we should change this to an environment variable so ppl don't my authentification
db = client.Queries

app.config['CORS_HEADERS'] = 'Content-Type'

#test
query_params = "No live query"

## import AI Alg

def get_data(data):
     data['_id'] = str(data['_id'])
     return data

@app.route("/output")
@cross_origin()
def helloWorld():
  import random
  cursor = db.Example.find({}).limit(1).sort([('$natural', pymongo.DESCENDING)])
  #current_query = dumps(cursor, default=json_util.default)
  x = {}
  for i in cursor:
    x=get_data(i)
    break

  ret = []
  country = ""
  si = 0

  #sort through data
  for key in x:
    print(key)
    print(x[key])
    if key=="_id":
      continue
    if key=="title":
      country = str(x[key]["text"])
      continue
    if key=="new cases":
      try:
        ret.append(float(x[key]))
        ret.append(float(x[key]))
      except ValueError:
        ret.append(5)             #this should be fetch table
      continue
    if key=="deaths":
      try:
        ret.append(float(x[key]))
        ret.append(float(x[key]))
      except ValueError:
        ret.append(5)
      continue
    try:
      ret.append(float(x[key]))
    except ValueError:
      ret.append(5)
  
  #ret = data into algorithm, must be int/float
  #out = data out to FE, must be string!
  out = [country, "Index: " + str(si)]

  for i in ret:
    print(i)
    out.append(str(i))

  return {"output": out}

@app.route("/input", methods=['POST'])
@cross_origin()
def input():
  x=request.get_json()
  res = db.Example.insert_one(x)
  print(x)
  return query_params

if __name__ == "__main__":
    app.run()