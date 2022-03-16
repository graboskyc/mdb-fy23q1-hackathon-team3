exports = async function(searchTerm){
  //var obj = EJSON.parse(objstr);
  
  var conn = context.services.get("mongodb-atlas").db("FlexForm").collection("FormDefinition");
  
  // var pipeline = [{$sample: {
  //   size: 3
  // }}, {$project: {
  //   title:1
  // }}];
  
  var searchPipeline = [
  {
    '$search': {
      'index': 'formDefinitionsSearch', 
      'text': {
        'query': searchTerm, 
        'path': 'title', 
        'fuzzy': {
          'maxEdits': 1
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