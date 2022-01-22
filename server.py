from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/members")
@cross_origin()
def helloWorld():
  return {"members": ["angela", "david", "crouton"]}

if __name__ == "__main__":
    app.run()