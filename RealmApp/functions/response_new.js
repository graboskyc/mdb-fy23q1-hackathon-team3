exports = async function(obj){
  
  var now = new Date();
  
  var conn = context.services.get("mongodb-atlas").db("FlexForm").collection("Response");
  
  //delete obj._id;
 ///obj._pk = "GLOBAL";
 obj.formDefinitionId = BSON.ObjectId(obj.formDefinitionId);
 obj._id = BSON.ObjectId();
  
  await conn.insertOne(obj);
  
};