exports = async function(arg) {
  let AWS = require('aws-sdk');  
  AWS.config = new AWS.Config();
  //Important: Don't forget to create these Values before running the function!
  AWS.config.accessKeyId = context.values.get("awsAccessKeyId");
  AWS.config.secretAccessKey = context.values.get("awsSecretAccessKey");
  AWS.config.region = context.values.get("awsRegion");
  let comprehendmedical = new AWS.ComprehendMedical({apiVersion: '2018-10-30'});
  //See this page for available entities: https://docs.aws.amazon.com/comprehend-medical/latest/dev/textanalysis-entitiesv2.html
  let acceptableEntities = ['MEDICATION', 'TEST_TREATMENT_PROCEDURE', 'TREATMENT_NAME', 'MEDICAL_CONDITION', 'ANATOMY'];

  //Test
  // let sanitizedInput = "Breakthrough and heavy periods; longer period length; This is a spontaneous report received from a contactable reporter(s) (Consumer or other non HCP). The reporter is the patient.  A 44 year-old female patient (not pregnant) received bnt162b2 (BNT162B2), administered in arm left, administration date 26Mar2021 09:00 (Lot number: EP6955) as dose 1, single and administered in arm left, administration date 19Apr2021 10:00 (Lot number: ER8731) as dose 2, single for covid-19 immunisation. The patient's relevant medical history was not reported. Concomitant medication(s) included: ALDACTONE [SPIRONOLACTONE]. The following information was reported: HEAVY MENSTRUAL BLEEDING (non-serious) with onset 07Jun2021, outcome not recovered, described as Breakthrough and heavy periods; OLIGOMENORRHOEA (non-serious) with onset 07Jun2021, outcome unknown, described as longer period length. Relevant laboratory tests and procedures are available in the appropriate section. Therapeutic measures were not taken as a result of heavy menstrual bleeding.  Additional Information: Patient did not receive any other vaccines within 4 weeks prior to the COVID vaccine.  No, prior to vaccination, was the patient diagnosed with COVID-19. Device Date: 27Sep2021.  No follow-up attempts are possible. No further information is expected.".replace('"', '');
  let sanitizedInput = arg.replace('"', '');
  
  var params = {
    Text: sanitizedInput
  };
  
  let functionResponse;
  let allEntities;
  try {
    let awsResponse = await comprehendmedical.detectEntitiesV2(params).promise();
    if (awsResponse) {
      allEntities = awsResponse['Entities'];  
    }
  }
  catch(error) {
    functionResponse = {
      error: error
    }
  }
  
  if (allEntities) {
    functionResponse = {
      "TEST_TREATMENT_PROCEDURE": [],
      "TREATMENT_NAME": [],
      "MEDICAL_CONDITION": [],
      "MEDICATION": [],
      "ANATOMY": []
    }
  // console.log(JSON.stringify(allEntities)); //test
   allEntities.forEach(entity => {
     let entityCategory = entity.Category;
     if (acceptableEntities.indexOf(entityCategory) != -1) {
      switch(entityCategory) {
        case "TEST_TREATMENT_PROCEDURE":
          functionResponse['TEST_TREATMENT_PROCEDURE'].push(entity.Text);
          break;
        case "TREATMENT_NAME": 
          functionResponse['TREATMENT_NAME'].push(entity.Text);
          break;
        case "MEDICAL_CONDITION": 
          functionResponse['MEDICAL_CONDITION'].push(entity.Text);
          break;
        case "MEDICATION": 
          functionResponse['MEDICATION'].push(entity.Text);
          break;
        case "ANATOMY": 
          functionResponse['ANATOMY'].push(entity.Text);
          break;
        default:
      }
     }
    // else {console.log("skipped " + entityCategory);} //test
   })
  }

  return functionResponse;
};