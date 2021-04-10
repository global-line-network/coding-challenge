from flask import Flask, request, render_template, jsonify, make_response
import requests

app = Flask(__name__)
app.debug = True

@app.route('/')
def hello_world():
    return render_template('home.html')

@app.route("/api/delete_user", methods=['POST'])
def delete_user():
    user_id = request.args.get('userid')
    url = "https://reqres.in/api/users/{}".format(user_id)
    response = requests.delete(url)
    return jsonify(response.text)

@app.route("/api/get_user", methods=['GET'])
def get_user():
    url = "https://reqres.in/api/users?per_page=100"
    response = requests.get(url)
    if response.ok:
        return jsonify(response.text)
    else:
        abort(400)

if __name__ == '__main__':
    app.run()