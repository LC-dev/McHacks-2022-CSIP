from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pymongo
from pymongo import MongoClient
import certifi
from bson.json_util import dumps, loads

app = Flask(__name__)

ca = certifi.where()

client=MongoClient("mongodb+srv://paulhinta:cP3&bG32@cluster0.xov9o.mongodb.net/Queries?retryWrites=true&w=majority", tlsCAFile=ca)
#At the end we should change this to an environment variable so ppl don't my authentification
db = client.Queries

app.config['CORS_HEADERS'] = 'Content-Type'

#test
query_params = "No live query"

def dummy_alg():
  import math

  x,y,z=0,0,0

  while True:
      x+=1
      y+=2
      z+=math.sqrt(1/(x+y^2))
      if x==5:
          break
  
  print("Dummy algorithm completed")
  print(query_params)
  
  return (x,y,z)

t = dummy_alg()

x,y,z = t[0],t[1],t[2]

print('Python script loaded')

@app.route("/output")
@cross_origin()
def helloWorld():
  import random
  cursor = db.Example.find({}).limit(1).sort([('$natural', pymongo.DESCENDING)])
  current_query = loads(dumps(cursor))
  return {"output": [str(current_query),"covid is bad", "masks are good", str(x), str(y), str(z), str(random.randint(4,9000))]}

@app.route("/input", methods=['POST'])
@cross_origin()
def input():
  x=request.get_json()
  res = db.Example.insert_one(x)
  print(x)
  return query_params

if __name__ == "__main__":
    app.run()