module.exports = {
  queryBuilder: (req) => {
    let query = [];
    if (req.query.name) {
      query.push({
        '$search': {
          'index': 'title',
          'text': {
            'query': req.query.name,
            'path': {
              'wildcard': '*'
            }
          }
        }
      })
    }
    if (req.query.genres) {
      query.push({
        "$match": {
          genres: {
            "$in": [req.query.genres]
          }
        }
      })
    }
    if (!req.query.name) {
      query.push({"$sort": { name: 1 }})
    }
    return query;
  }
}
