import nltk, urllib, json
from bs4 import BeautifulSoup

wiki = "https://en.wikipedia.org/wiki/List_of_cities_by_latitude"
page = urllib.request.urlopen(wiki)
soup = BeautifulSoup(page, "html.parser")

results = {}

tables = soup.findAll("table", { "class" : "wikitable sortable" })
for table in tables:
    for row in table.findAll("tr"):
        cells = row.findAll("td")
        if len(cells) == 5:
            city = cells[2].find(text=True)
            country = ""
            if cells[4].find("a"):
              country = cells[4].find("a").find(text=True)
            latitude = cells[0].find(text=True) 
            longitude = cells[1].find(text=True)
            city = city + ", "  + country
            print(city)
            print(latitude)
            obj = {"latitude": latitude, "longitude": longitude}
            results[city] = obj
            
with open('../static/js/cities.json', 'w') as writefile:
    json.dump(results, writefile)
