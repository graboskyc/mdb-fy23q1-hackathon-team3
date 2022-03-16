exports = function(arg){
  let collection = context.services.get("mongodb-atlas").db("SearchContent").collection("VAERS2022");
  let query = arg;
  let pipeline;

  // query='aspirin';//test
  
  if(query) {
    //Facets for fulltext search
    pipeline = [{
    "$searchMeta": {
      "index": "default",
      "count": { "type": "total" },
      "facet": {
        "operator": {
            "compound": {
                "must": [
                    {
                    "text": {
                        "path": ["HISTORY", "LAB_DATA", "ONSET_DATE", "OTHER_MEDS", "SYMPTOM_TEXT"],
                        "query": query,
                        "fuzzy": {
                            "maxEdits": 1,
                            "maxExpansions": 100
                        }
                    }
                }]
            }
        },
        "facets": {
          "Anatomy": {
            "type": "string",
            "path": "entities.ANATOMY",
            "numBuckets": 10
          },
          "Condition": {
              "type": "string",
              "path": "entities.MEDICAL_CONDITION",
              "numBuckets": 10
          },
          "Medication": {
            "type": "string",
            "path": "entities.MEDICATION",
            "numBuckets": 10
          },
          "Procedure": {
              "type": "string",
              "path": "entities.TEST_TREATMENT_PROCEDURE",
              "numBuckets": 10
          },
          "Treatment": {
              "type": "string",
              "path": "entities.TREATMENT_NAME",
              "numBuckets": 10
          }
        }
      }
    }
  }];
  }
  else  {
    //Facets for empty search
    pipeline = [{
  "$searchMeta": {
    "index": "default",
    "count": { "type": "total" },
    "facet": {
      "operator": { "exists": { "path": "SYMPTOM_TEXT" } },
      "facets": {
        "Anatomy": {
          "type": "string",
          "path": "entities.ANATOMY",
          "numBuckets": 10
        },
        "Condition": {
            "type": "string",
            "path": "entities.MEDICAL_CONDITION",
            "numBuckets": 10
        },
        "Medication": {
          "type": "string",
          "path": "entities.MEDICATION",
          "numBuckets": 10
        },
        "Procedure": {
            "type": "string",
            "path": "entities.TEST_TREATMENT_PROCEDURE",
            "numBuckets": 10
        },
        "Treatment": {
            "type": "string",
            "path": "entities.TREATMENT_NAME",
            "numBuckets": 10
        }
      }
    }
  }
}];
  }
  
  return collection.aggregate(pipeline);
};