var notes = require("../db/db.json");
const path = require("path");
const fs = require('fs');

module.exports = function(app){

    //  GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
  app.get("/api/notes", function(req, res){
      return res.json(notes);
  });
  
   // POST /api/notes - Should recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
  app.post("/api/notes", function(req, res){
      notes.push(req.body);
      res.json(true);
      fs.writeFile(path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes), function(err){ 
          if (err) throw err;
          console.log("Saved");
      });
  });
   // DELETE /api/notes/:id - Should recieve a query paramter containing the id of a note to delete.
   // give each note a unique id
   app.delete("/api/notes/:id", function(req,res){
       var notesId = req.params.id;
       notes = notes.filter(x => x.id != notesId);
       fs.writeFile(path.join(__dirname, "../db/db.json"),JSON.stringify(notes),
       function (err){
           if (err) throw err;
           console.log("deleted");
       });
       res.json(true);
   });
};

