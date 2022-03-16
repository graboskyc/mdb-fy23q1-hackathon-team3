exports = async function(arg) {
    let collection = context.services.get("mongodb-atlas").db("SearchContent").collection("VAERS2022");
    let doc = arg.fullDocument;
    let docid = arg.documentKey._id;
    
    let entities = await enrichDoc(doc);
    collection.updateOne({_id:docid},{$set:{entities: entities}});

  return 0;
};

async function enrichDoc(doc) {
    let entities = {
      "TEST_TREATMENT_PROCEDURE": [],
      "TREATMENT_NAME": [],
      "MEDICAL_CONDITION": [],
      "MEDICATION": [],
      "ANATOMY": []
    };
    if(doc.SYMPTOM_TEXT) {
      let response = await context.functions.execute("aws_medicalNER", doc.SYMPTOM_TEXT);
      // console.log(JSON.stringify(response)); //test
      if (response['TEST_TREATMENT_PROCEDURE']) {
        entities["TEST_TREATMENT_PROCEDURE"].push(...response['TEST_TREATMENT_PROCEDURE']); 
      }
      if(response['TREATMENT_NAME']) {
        entities['TREATMENT_NAME'].push(...response['TREATMENT_NAME']);
      }
      if(response['MEDICAL_CONDITION']) {
        entities['MEDICAL_CONDITION'].push(...response['MEDICAL_CONDITION']);
      }
      if(response['MEDICATION']) {
        entities['MEDICATION'].push(...response['MEDICATION']);
      }
      if(response['ANATOMY']) {
        entities['ANATOMY'].push(...response['ANATOMY']);
      }
      // console.log("Lab data entities:" + JSON.stringify(entities)); //test
    }
    if(doc.LAB_DATA) {
      let response = await context.functions.execute("aws_medicalNER", doc.LAB_DATA);
      // console.log(JSON.stringify(response)); //test
      if (response['TEST_TREATMENT_PROCEDURE']) {
        entities["TEST_TREATMENT_PROCEDURE"].push(...response['TEST_TREATMENT_PROCEDURE']); 
      }
      if(response['TREATMENT_NAME']) {
        entities['TREATMENT_NAME'].push(...response['TREATMENT_NAME']);
      }
      if(response['MEDICAL_CONDITION']) {
        entities['MEDICAL_CONDITION'].push(...response['MEDICAL_CONDITION']);
      }
      if(response['MEDICATION']) {
        entities['MEDICATION'].push(...response['MEDICATION']);
      }
      if(response['ANATOMY']) {
        entities['ANATOMY'].push(...response['ANATOMY']);
      }
      // console.log(JSON.stringify(entities)); //test
    }
    if(doc.OTHER_MEDS) {
      let response = await context.functions.execute("aws_medicalNER", doc.OTHER_MEDS);
      // console.log(JSON.stringify(response)); //test
      if (response['TEST_TREATMENT_PROCEDURE']) {
        entities["TEST_TREATMENT_PROCEDURE"].push(...response['TEST_TREATMENT_PROCEDURE']); 
      }
      if(response['TREATMENT_NAME']) {
        entities['TREATMENT_NAME'].push(...response['TREATMENT_NAME']);
      }
      if(response['MEDICAL_CONDITION']) {
        entities['MEDICAL_CONDITION'].push(...response['MEDICAL_CONDITION']);
      }
      if(response['MEDICATION']) {
        entities['MEDICATION'].push(...response['MEDICATION']);
      }
      if(response['ANATOMY']) {
        entities['ANATOMY'].push(...response['ANATOMY']);
      }
      // console.log(JSON.stringify(entities)); //test
    }
    if(doc.HISTORY) {
      let response = await context.functions.execute("aws_medicalNER", doc.HISTORY);
      // console.log(JSON.stringify(response)); //test
      if (response['TEST_TREATMENT_PROCEDURE']) {
        entities["TEST_TREATMENT_PROCEDURE"].push(...response['TEST_TREATMENT_PROCEDURE']); 
      }
      if(response['TREATMENT_NAME']) {
        entities['TREATMENT_NAME'].push(...response['TREATMENT_NAME']);
      }
      if(response['MEDICAL_CONDITION']) {
        entities['MEDICAL_CONDITION'].push(...response['MEDICAL_CONDITION']);
      }
      if(response['MEDICATION']) {
        entities['MEDICATION'].push(...response['MEDICATION']);
      }
      if(response['ANATOMY']) {
        entities['ANATOMY'].push(...response['ANATOMY']);
      }
      // console.log(JSON.stringify(entities)); //test
    }
    
    // console.log(JSON.stringify(entities)); //test
    return entities;
}