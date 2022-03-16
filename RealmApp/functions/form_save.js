exports = async function(obj){
  //var obj = EJSON.parse(objstr);
  var now = new Date();
  
  var conn = context.services.get("mongodb-atlas").db("FlexForm").collection("FormDefinition");
  
  var id = BSON.ObjectId(obj._id);
  delete obj._id;
  obj.updated = now;
  obj._pk = "GLOBAL";
  
  await conn.updateOne({_id:id}, {$set:obj},{upsert: true })
};