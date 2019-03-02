
const express = require('express');
const app = express();
const _ = require('lodash');
const bodyParser = require('body-parser');
var fs = require("fs");
const formidable = require('formidable');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', function (req, res, next) {

  var form = new formidable.IncomingForm();
  form.parse(req);

  form.on('fileBegin', function (name, file) {
    file.path = __dirname + "/Films.txt";
  });

  form.on('file', function (name, file) {
    if(isTxt(file.name)){
      console.log(isTxt(file.name));
      try {
        writeToFile("Films.json", JSON.stringify(SortArrByTitleKey(JSON.parse(TxtToJson(fileread("Films.txt"))))), () =>  res.send(fileread("Films.json")))
      } catch (err) {
        res.send(JSON.stringify({ err: err.message }));
      }
    }else{
      try {
        writeToFile("Films.json", JSON.stringify(SortArrByTitleKey(JSON.parse(TxtToJson(fileread("Films.txt"))))), () =>  res.send(fileread("Films.json")))
      } catch (err) {
        res.send(JSON.stringify({ err: "Type do not match" }));
      }
    }
  });

});

app.get('/films', function (req, res) {
  res.send(fileread("Films.json"));
});

app.delete('/films', function (req, res) {
  const filmId = req.body.id;
  writeToFile('Films.json', JSON.stringify(DeleteFilmItem(filmId)), () =>
    res.send(JSON.stringify(DeleteFilmItem(filmId))))
});

app.post('/films', function (req, res) {
  const base = JSON.parse(fileread("Films.json"));
  base.push({ ...req.body, id : getMaxId(base) + 1  });
  fs.writeFile('Films.json', JSON.stringify(SortArrByTitleKey(base)), 'utf8', () => {
    res.send(JSON.stringify(SortArrByTitleKey(base)));
  });
});

app.listen(8080);

function fileread(filename) {
  var contents = fs.readFileSync(filename);
  return contents;
};

function SortArrByTitleKey(arr) {
  return arr.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  })
};

function isTxt(fileName){
  return fileName.split(".")[1] === "txt" ? true : false
}

function TxtToJson(txt) {
  return JSON.stringify(_.chunk(_.compact(txt.toString().split("\n")), 4).map((el, id) =>
    ({
      id,
      title: el[0].replace("Title: ", ""),
      release_year: el[1].replace("Release Year: ", ""),
      format: el[2].replace("Format: ", ""),
      stars: el[3].replace("Stars: ", "").split(","),
    })));
}

function DeleteFilmItem(filmId) {
  return _.compact(JSON.parse(fileread("Films.json")).map((el) => el.id === filmId ? null : el));
}

function writeToFile(fileName, content, callback) {
  const sortedContent = JSON.stringify(SortArrByTitleKey(JSON.parse(content)));
  fs.writeFile(fileName, sortedContent, 'utf8', callback);
};

function getMaxId(arr){
  return arr.reduce((prev, el) => {
    console.log(el.id + " " + prev);
    return (el.id > prev) ? el.id : prev
  }, 0);
}