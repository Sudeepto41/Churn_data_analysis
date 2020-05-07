from flask import Flask, render_template, jsonify, request
from random import randint
import os

import CleanData as cd

curr_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)


@app.route("/")
def test():
    return render_template("index.html")


@app.route("/data")
def data():
    dyn_data = str(randint(1, 10))
    return dyn_data


@app.route("/upload", methods=["POST"])
def get_csv():
    target = os.path.join(curr_dir, 'csv/')
    file = request.files['file']
    filename = file.filename
    dest = "/".join([target, filename])
    file.save(dest)
    #cd.clean(file, dest)
    return render_template("index.html")


if __name__ == "main":
    app.run(debug=True)
