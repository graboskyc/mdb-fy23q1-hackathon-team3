exports = async function(id){

  var conn = context.services.get("mongodb-atlas").db("FlexForm").collection("FormDefinition");
  
  var docs = await conn.find();
  
  return docs
  
};