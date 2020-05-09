from flask import Flask, render_template, jsonify, request
from random import randint
import os
import pandas as pd
from Dora import Dora


curr_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)


@app.route("/")
def homepage():
    return render_template("index.html") 


@app.route("/upload", methods=["POST"])
def get_csv():
    target = os.path.join(curr_dir, 'csv/')
    file = request.files['file']
    column_name = request.form.getlist('column_name[]')
    print(column_name)
    print('0')
    filename = file.filename
    dest = "/".join([target, filename])
    file.save(dest)
    #cd.clean(file, dest)
    return render_template("index.html")


if __name__ == "main":
    app.run(debug=True)


def clean(file, dest):

    data = pd.DataFrame(pd.read_csv(dest))

    c_unique = {}
    for cols in data.columns:
        if data[cols].dtypes == 'object':
            c_unique[cols] = list(data[cols].unique())

    for key in c_unique:
        print("0")
        print(key, ": ", len(c_unique[key]))
