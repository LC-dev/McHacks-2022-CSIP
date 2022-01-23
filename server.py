from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
import pymongo
from pymongo import MongoClient
import certifi
from bson.json_util import dumps, loads
import pickle
from io import open
import os
import numpy as np

filename="./finalized_model.sav"
loaded_model = pickle.load(open(filename, 'rb'))

p = int(os.environ.get("PORT", 5000))
app = Flask(__name__, static_folder="client/build", static_url_path="")
CORS(app)

ca = certifi.where()

client=MongoClient("mongodb+srv://paulhinta:cP3&bG32@cluster0.xov9o.mongodb.net/Queries?retryWrites=true&w=majority", tlsCAFile=ca)
#At the end we should change this to an environment variable so ppl don't my authentification
db = client.Queries

#test
query_params = "No live query"

## import AI Alg

populations = {
  "Belgium": 12000000,
  "Bulgaria": 6896655,
  "Cyprus": 896005,
  "Czhechia": 11000000,
  "Denmark": 5813302,
  "Estonia": 1325188,
  "Finland": 5548361,
  "Ireland": 4982904,
  "Italy": 60000000,
  "Luxembourg": 634814,
  "Malta": 516100,
  "Netherlands": 17000000,
  "Portugal": 10000000,
  "Serbia": 6871547,
  "Slovakia": 5549270,
  "Spain": 47000000,
  "Switzerland": 8715494,
  "United Kingdom": 68000000,
  "Australia": 26000000,
  "New Zealand": 5126300,
  "Canada": 38000000,
  "United States": 330000000
}

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

  exceptions = {
    "cases": 5000,
    "deaths": 48,
    "reproduction": 0.76,
    "icu": 1283,
    "hosp": 3500,
    "positive": 0.05,
    "testper": 20,
    "tvac": 20000000,
    "totalvacpeople": 18000000,
    "fullyvac": 1500000,
    "booster": 170,
    "newvac": 365000,
    "newvacpeople": 340000
  }

  #sort through data
  for key in x:
    print(x[key])

    if key=="_id":
      continue

    if key=="title":
      country = str(x[key])
      country = country.split(',')[0]
      country = country.split("'")[3]
      country = country.capitalize()
    if x[key]=="title":
      country = str(x[key]["text"])
    if x[key]=="title":
      country = str(x[key]["text"])
      continue
    
    #double count
    if key == "cases" or key == "deaths":
      if x[key]==0 or x[key]=="":
        ret.append(float(exceptions[key]))
        ret.append(float(exceptions[key]))
      else:
        ret.append(float(x[key]))
        ret.append(float(x[key]))
      continue
    
    if x[key]=="":
      ret.append(float(exceptions[key]))
      continue
    else:
      try:
        ret.append(float(x[key]))
      except TypeError:
        continue
      continue

  try:
    pop = populations[country]
  except KeyError:
    pop = populations["Canada"]
    country = "Canada"

  user_input = np.asarray(ret)

  print(user_input)

  #normalize data
  for i in range(4):
    user_input[i]=user_input[i]*(10**6)/pop

  for i in [5, 6]:
    user_input[i]=user_input[i]*(10**6)/pop

  for i in range(9,14):
    user_input[i]=user_input[i]*(10**6)/pop

  final_input=user_input[np.newaxis,:]
  
  #ret = data into algorithm, must be int/float
  #out = data out to FE, must be string!
  si = loaded_model.predict(final_input)[0]

  out = [country, "Index: " + str(si)]

  return {"output": out}

@app.route("/input", methods=['POST'])
@cross_origin()
def input():
  x=request.get_json()
  res = db.Example.insert_one(x)
  print(x)
  return query_params

app.run(port=p, host='0.0.0.0')