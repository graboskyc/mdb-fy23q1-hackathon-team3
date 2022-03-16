exports = async function(searchTerm){
  //var obj = EJSON.parse(objstr);
  
  var conn = context.services.get("mongodb-atlas").db("FlexForm").collection("EncodedPhoto");
  
  
  var searchPipeline = [
  {
    $search: {
      index: 'default',
      text: {
        query: searchTerm,
        path: {
          'wildcard': '*'
        }
      }
    }
  }, {
    '$project': {
      '_id': 1, 
      'title': 1
    }
  }
];
  
  var result = await conn.aggregate(searchPipeline);
  
  return result;
  
};