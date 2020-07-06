from flask import Flask, render_template, jsonify, request, make_response
import os
import json
from datetime import datetime
from flaskr import cleaner as cl
from flaskr import prediction_algorithms as pr
import pandas as pd


curr_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)

filename = ''
history_filename = []
history_time = []


def update_history(raw_data_file, history_filename, history_time):
    filename = raw_data_file.filename
    time = datetime.now().strftime('%H:%M')

    if filename in history_filename:  # if filename exists then pop old values
        history_time.pop(history_filename.index(filename))
        history_filename.pop(history_filename.index(filename))

        history_filename.append(filename)  # insert new ones at the last
        history_time.append(time)
    else:
        history_filename.append(filename)  # insert new values
        history_time.append(time)


@app.route("/")
def homepage():
    return render_template("index.html")


@app.route("/upload", methods=["GET", "POST"])
def get_csv():
    raw_data_file = request.files['file']
    omit_column = request.form.getlist('column_name[]')

    # drop columns, drop null values, fix column dtype
    use_data, desc = cl.cleanData(raw_data_file, omit_column)

    # create data description
    #desc = pd.DataFrame(pd.read_csv(use_data)).describe(include='all')
    
    # call function to update history
    update_history(raw_data_file, history_filename, history_time)

    # send back the cleaned csv data file
    resp = make_response(use_data)
    return resp, 200


@app.route("/history", methods=['GET'])
def getHistory():
    resp = jsonify(history_filename, history_time)
    return resp

@app.route("/desc", methods=['GET'])
def getDescription():
    return 'yeet!!!'


if __name__ == "main":
    app.run(debug=True)
