const db = require("./bears-model");

const router = require("express").Router();

router.get("/", (req, res) => {
  // get the roles from the database
  db.find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ message: "bear not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  // add a role to the database
  db.add(req.body)
    .then(bear => {
      res.status(201).json(bear);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name) {
    res.status(422).json({ message: "name field required" });
  }
  // update roles
  db.update(id, { name })
    .then(bear => {
      if (bear) {
        res.json(bear);
      } else {
        res.status(404).json({ message: "bear not found" });
      }
    })
    .catch(err => {
      res.status(err).json(err);
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "bear deleted" });
      } else {
        res.status(404).json({ message: "bear not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
