exports = async function(obj){
  
  var now = new Date();
  
  var conn = context.services.get("mongodb-atlas").db("FlexForm").collection("FormDefinition");
  
  delete obj._id;
  obj.updated = now;
  obj.created = now;
  obj._pk = "GLOBAL";
  
  await conn.insertOne(obj);
  
};