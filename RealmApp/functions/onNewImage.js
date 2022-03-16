exports = function(changeEvent) {
  
    const docId = changeEvent.documentKey._id;
    const fullDocument = changeEvent.fullDocument;
    
    const img = fullDocument.encoded;
    
    var AWS = require('aws-sdk');  
    AWS.config.update({
      region: "us-east-1",
      "accessKeyId": "", 
      "secretAccessKey": ""
    });
    
    var rek = new AWS.Rekognition({apiVersion: "2016-06-27"});
    
    const params = {
      "Image": {
        "Bytes":encodeURIComponent(img)
      },
    };
    console.log(JSON.stringify(params));
    rek.detectText(params, function(err, response) {
    if (err) {
      console.log(err, err.stack); // handle error if an error occurred
    } else {
      console.log(response)
      
    } 
  });
    
};
