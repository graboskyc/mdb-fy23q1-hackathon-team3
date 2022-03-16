exports = function(arg){
  let collection = context.services.get("mongodb-atlas").db("SearchContent").collection("VAERS2022");
  let query = arg;
  let pipeline;

  // query='aspirin';//test
  
  if(query) {
    //Facets for fulltext search
    pipeline = [{
    "$search": {
        "index": "default",
        "count": { "type": "total" },
        "text": {
            "path": ["HISTORY", "LAB_DATA", "ONSET_DATE", "OTHER_MEDS", "SYMPTOM_TEXT"],
            "query": query,
            "fuzzy": {
                "maxEdits": 1,
                "maxExpansions": 100
            }
        }
    }
},
{"$limit": 100}];
  return collection.aggregate(pipeline);
  }
  else  {
    return collection.find().limit(1000);
  }
};