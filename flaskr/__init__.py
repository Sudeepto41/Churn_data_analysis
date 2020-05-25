from flask import Flask, render_template, jsonify, request, make_response
import os
from flaskr import cleaner as cl


curr_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)


@app.route("/")
def homepage():
    return render_template("index.html")


@app.route("/upload", methods=["GET", "POST"])
def get_csv():
    #target = os.path.join(curr_dir, 'csv/')
    raw_data_file = request.files['file']
    omit_column = request.form.getlist('column_name[]')
    print(omit_column)
    print(len(omit_column))
    #filename = datafile.filename
    #dest = "/".join([target, filename])
    # file.save(dest)
    resp = make_response(cl.clean(raw_data_file, omit_column))

    return resp, 200


if __name__ == "main":
    app.run(debug=True)
