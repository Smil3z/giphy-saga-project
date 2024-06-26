const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "favorites";`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error retrieving favorites', error);
    res.sendStatus(500);
  })
});

router.get('/:id', (req, res) => {
    const queryText =`SELECT * FROM "favorites" 
      WHERE "category_id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows)
    }).catch((error) => {
      console.error('Trouble getting fav', error)
    })
});

// add a new favorite
router.post('/', (req, res) => {
  const newFav = req.body;
  const queryText = `INSERT INTO "favorites" ("GIPHY_URL", "GIPHY_Title", "GIPHY_ID")
  VALUES ($1, $2, $3);`;
  const queryValues = [
    newFav.link,
    newFav.title,
    newFav.ID,
  ];
  pool.query(queryText, queryValues)
  .then(() => {
    res.sendStatus(201)
  }).catch((error) => {
    console.log('Error adding fav', error);
    res.sendStatus(500);
  })
});

// update a favorite's associated category
router.put('/:id', (req, res) => {
  let queryText = `
    UPDATE "favorites"
    SET category_id = $1
    WHERE favorites.id = $2;
  `;
  pool.query(queryText, [req.body.category, req.params.id])
  .then((result) => {
    res.sendStatus(200)
  }).catch((e) => {
    console.error('Error adding category', e);
    res.sendStatus(500);
  })
  // req.body should contain a category_id to add to this favorite image
});

// delete a favorite
router.delete('/:id', (req, res) => {
  let queryText = `DELETE FROM "favorites" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
    res.sendStatus(201);
  }).catch((e) => {
    console.error('delete error', e)
    res.sendStatus(500);
  })
});

module.exports = router;