exports = async function(id){

  var conn = context.services.get("mongodb-atlas").db("FlexForm").collection("FormDefinition");
  
  var doc = await conn.findOne({_id:BSON.ObjectId(id)});
  
  return doc
  
};