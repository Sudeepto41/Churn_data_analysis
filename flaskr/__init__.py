from flask import Flask, render_template, jsonify, request, make_response
import os
import json
from datetime import datetime
from flaskr import cleaner as cl
from flaskr import prediction_algorithms as pr


curr_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)

filename = ''
history = {'filename': [], 'time': []}


@app.route("/")
def homepage():
    return render_template("index.html")


@app.route("/upload", methods=["GET", "POST"])
def get_csv():
    raw_data_file = request.files['file']
    omit_column = request.form.getlist('column_name[]')

    # create file history with name and time
    filename = raw_data_file.filename
    time = datetime.now().strftime('%H:%M')
    history['filename'].append(filename)
    history['time'].append(time)

    print(history)

    # drop columns
    use_data = cl.cleanData(raw_data_file, omit_column)

    # send back the cleaned csv data file
    resp = make_response(use_data)
    return resp, 200


@app.route("/history", methods=['GET'])
def getHistory():
    return json.dumps(history)


if __name__ == "main":
    app.run(debug=True)
