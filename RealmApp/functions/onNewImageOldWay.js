exports = async function(changeEvent) {
  
    const docId = changeEvent.documentKey._id;
    const fullDocument = changeEvent.fullDocument;
    
    const img = fullDocument.encoded;
    
    console.log(img);
    console.log(Buffer.from(img, 'base64'));
    
    const aws = context.services.get('aws');
    var awsreq = aws.rekognition().DetectText({"Image": {"Bytes":Buffer.from(img, 'base64')}});
    var res = await awsreq;
    console.log(JSON.stringify(res));
    
};
