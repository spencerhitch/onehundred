import json
from onehundred.solutions.numbers import *
from flask import Flask, render_template, request, jsonify, url_for

app = Flask(__name__)
projects = {}

# TODO: Might need to construct URL with url_for()
with open('static/js/projects.json') as f:
  projects = json.load(f)["projects"]

@app.route('/')
def index():
  return render_template('index.html', projects=projects)

@app.route('/pset/<int:pset_index>')
def pset(pset_index):
  pset = projects[pset_index]
  return render_template('pset.html', pset=pset)

@app.route('/problem')
def problem():
  inputs = [] 
  index = request.args.get('index',0,type=str) 
  function = functions_index[int(index)] 
  try:
      inputs.append(request.args.get('inp',0,type=str))
  result = function(*inputs)
  return jsonify(result=result)
