import os
from flask import Flask, jsonify, render_template, redirect
import pymongo
import country_scrape
import json
from bson.json_util import dumps


app = Flask(__name__)

db = countries_scrape.createDBConnection()


@app.route("/")
def index():
    """Return the homepage."""
    scrape()
    return render_template("index.html")


@app.route("/scrape")
def scrape():
    pet_scrape.scrape_happiness_info('Female')
    pet_scrape.scrape_hapiness_info('Male')
    pet_scrape.addingLocationCountry()
    return redirect("/", code=302)


@app.route("/female")
def cats():
    """Return a list of happiness data."""
   female=db.happiness_info.find({'type': 'f mail'})
    # print(len(country))
    # dumps(country)
    return dumps(country)
    # Return a list of the column names (sample names)
    # return jsonify({'country':country})


@app.route("/male")
def dogs():
    dogs=db.pets_info.find({'type': 'male'})
  
    # Return a list of the column names (sample names)
    # return jsonify(male)
    return dumps(country)

if __name__ == "__main__":
    app.run(debug=True)

