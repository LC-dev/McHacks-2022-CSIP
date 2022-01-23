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
import math

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

policy = {
  0: "This country is well off with regards to Covid-19. As long as the government continues to educate the public on proper hygiene, no additional measures need to be taken.",
  1: "This country is doing relatively well, but some measures should be taken. The government should prioritize supplying protective equipment such as masks to those who are most vulnerable, such as the elderly in retirement homes.",
  2: "This country should be cautious. Government officials should have contingency plans set in place and be ready to act at any moment that a potential outbreak occurs.",
  3: "This country should be cautious. A mask mandate should be implemented for all indoor activities. Officials should advise against nonessential in-person activities, such as certain school events and social gatherings.",
  4: "This country should be cautious. A mask mandate should be implemented for all indoor activities. The government should mandate remote learning where possible, such as high schools and universities. Remote work is encouraged, where possible. Indoor social gatherings should be limited to 10 people.",
  5: "This country has fallen behind in its COVID response plan. To reduce spread, a mask mandate should be implemented for all indoor activities. Where possible, schools should operate remotely. Remote work is encouraged, where possible. All social gatherings should be restricted to five people.",
  6: "The public health system of this country is at a relatively high risk of collapsing. A mask mandate should be implemented. Proof of vaccination should be required for non-essential activities. Remote work should be mandated in hotspot regions. Where possible, schools should operate remotely.",
  7: "The public health system of this country is at a high risk of collapsing. Mask and vaccine mandates should be implemented. Remote work should be mandated in hotspot regions. Schools should operate remotely. Social gatherings with people from different households should be banned.",
  8: "The public health system of this country is failing. Wearing a mask and providing proof of vaccination should be required everywhere. All school should operate remotely. Non-essential (in-person) businesses should close. A fine should be introduced for those who violate social gathering rules. The government should consider closing certain international borders.",
  9: "The public health system of this coutnry is failing. Mask and vaccine mandates should be required everywhere. All schools and non-essential businesses should operate remotely; those that can't should be closed, facing possible fines otherwise. International borders should close and domestic travel should be restricted."
}

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

    if key=="_id":
      continue

    if key=="title":
      country = str(x[key])
      country = country.split(',')[0]
      country = country.split("'")[3]
      country = country.capitalize()
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

  out = [country, "Index: " + str(round(si,2))]

  policy_rec = policy[int(math.floor(si/10))]

  out.append(policy_rec)

  return {"output": out}

@app.route("/input", methods=['POST'])
@cross_origin()
def input():
  x=request.get_json()
  res = db.Example.insert_one(x)
  return query_params

if __name__ == "__main__":
    app.run(port=p, host='0.0.0.0')