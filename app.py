from flask import Flask, request, render_template, jsonify, make_response
import requests

app = Flask(__name__)
app.debug = True

@app.route('/')
def hello_world():
    return render_template('home.html')

@app.route("/get_user", methods=['GET'])
def get_user():
    page = request.args.get('page', default = 1, type = int)
    url = "https://reqres.in/api/users?page={}".format(page)
    response = requests.get(url)
    if response.ok:
        return jsonify(response.text)
    else:
        abort(400)

if __name__ == '__main__':
    app.run()