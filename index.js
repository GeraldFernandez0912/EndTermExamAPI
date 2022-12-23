const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const port = 5000;

// Set up default mongoose connection
const url = "mongodb+srv://fernandezgerald02:1234@dbcluster.xljzcft.mongodb.net/test";
const client = new MongoClient(url);

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

const dbName = "etExam";
let db;
client
  .connect()
  .then(async () => {
    db = client.db(dbName);
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
    console.log("Unable to connect to Mongodb");
  });

//Get All Patients
app.get("/Patients", (req, res) => {
  db.collection("Patients")
    .find({})
    .toArray()
    .then((records) => {
      return res.json(records);
    })
    .catch((err) => {
      console.log("err");
      return res.json({ msg: "There was an error processing your query" });
    });
});

//Get Specific Patients
app.get("/Patients", (req, res) => {
    const id = req.params._id;
    db.collection("Patients")
      .find({_id: ObjectId(id)})
      .toArray()
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log("err");
        return res.json({ msg: "There was an error processing your query" });
      });
  });

//Get All Prescriptions
app.get("/Prescriptions", (req, res) => {
    db.collection("Prescriptions")
      .find({})
      .toArray()
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log("err");
        return res.json({ msg: "There was an error processing your query" });
      });
  });

//Get Specific Prescriptions
app.get("/Prescriptions/:_id", (req, res) => {
  const id = req.params._id;
  db.collection("Prescriptions")
    .find({_id: ObjectId(id)})
    .toArray()
    .then((records) => {
      return res.json(records);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ msg: "There was an error processing your query" });
    });
});

//Create a patient

app.post("/Patients", (req, res) => {
    console.log(req.body);
    const {patient_no,name,gender,age,birthdate,address,contact_no} = req.body;
    db.collection("Patients")
      .insertOne({patient_no,name,gender,age,birthdate,address,contact_no})
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "There was an error processing your query" });
      });
  });

  //Create Prescriptions

  app.post("/Prescriptions", (req, res) => {
    console.log(req.body);
    const {patient_no,name,age,date,diagnosis,medication} = req.body;
    db.collection("Prescriptions")
      .insertOne({patient_no,name,age,date,diagnosis,medication})
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "There was an error processing your query" });
      });
  }); 

  //Update patients
  app.put("/Patients/:_id", (req, res) => {
    const id = req.params._id;
    db.collection("Patients")
      .updateOne(
        {
            _id: ObjectId(id)
        },
        {
          $set:req.body
        }
      )
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "There was an error processing your query" });
      });
  });

  //Delete a patient

  app.delete("/Patients/:_id", (req, res) => {
    const id = req.params._id;
    db.collection("Patients")
      .deleteOne(
        {
            _id: ObjectId(id)
        })
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "There was an error processing your query" });
      });
  });

  //Delete a prescription

  app.delete("/Prescriptions/:_id", (req, res) => {
    const id = req.params._id;
    db.collection("Prescriptions")
      .deleteOne(
        {
          _id: ObjectId(id)
        })
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "There was an error processing your query" });
      });
  }); 

  //Add a medication to the prescription
  app.put("/Prescriptions/:_id", (req, res) => {
    const id = req.params._id;
    const {medication} = req.body;
    db.collection("Prescriptions")
      .updateOne(
        {
          _id: ObjectId(id)
        },
        {
          $push: {
            medication
          }
        }
      )
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "There was an error processing your query" });
      });
  });

  //Remove a medication from a prescription
  app.put("/Prescriptions_/:_id", (req, res) => {
    const id = req.params._id;
    const {medication} = req.body;
    db.collection("Prescriptions")
      .updateOne(
        {
          _id: ObjectId(id)
        },
        {
          $pull: {
            medication
          }
        }
      )
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "There was an error processing your query" });
      });
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});