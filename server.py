from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

import math
import random

x,y,z=0,0,0

while True:
    x+=1
    y+=2
    z+=math.sqrt(1/(x+y^2))
    if x==5:
        break

@app.route("/output")
@cross_origin()
def helloWorld():
  return {"output": ["covid is bad", "masks are good", str(x), str(y), str(z), str(random.randint(4,9000))]}

if __name__ == "__main__":
    app.run()