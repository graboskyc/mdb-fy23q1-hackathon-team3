#!/bin/bash
# Ask the user for their name
echo What is your Atlas API Public Key?
read PUBLIC_KEY
echo What is your Atlas API Private Key?
read PRIVATE_KEY
echo What is your Atlas PROJECT_ID?
read GROUP_ID
echo What is your Atlas Cluster name?
read CLUSTER_NAME


COLLECTION_NAME="FormDefinition"
DATABASE="FlexForm"
INDEX_NAME="FormDefinitionsSearch"

echo Thanks, creating Search Indexes For $CLUSTER_NAME 
curl --user "$PUBLIC_KEY:$PRIVATE_KEY" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/$GROUP_ID/clusters/$CLUSTER_NAME/fts/indexes?pretty=true" \
     --data '{
         "collectionName": "FormSection",
         "database": "FlexForm",
         "mappings": {
    "dynamic": true,
    "fields": {
      "formdefintion": {
        "fields": {
          "title": [
            {
              "analyzer": "lucene.english",
              "searchAnalyzer": "lucene.english",
              "type": "string"
            },
            {
              "minGrams": 4,
              "type": "autocomplete"
            }
          ]
        },
        "type": "document"
      }
    }
  },
  "name": "FormSectionSearch"
}'

curl --user "$PUBLIC_KEY:$PRIVATE_KEY" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/$GROUP_ID/clusters/$CLUSTER_NAME/fts/indexes?pretty=true" \
     --data '{
         "collectionName": "EncodedPhoto",
         "database": "FlexForm",
           "mappings": {
    "dynamic": true,
    "fields": {
      "rek": {
        "dynamic": true,
        "type": "document"
      }
    }
  },
  "name": "EncodedPhotoSearch"
}'

curl --user "$PUBLIC_KEY:$PRIVATE_KEY" --digest \
     --header "Content-Type: application/json" \
     --include \
     --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/$GROUP_ID/clusters/$CLUSTER_NAME/fts/indexes?pretty=true" \
     --data '{
         "collectionName": "VAERS2022",
         "database": "SearchContent",
"analyzer": "lucene.english",
  "searchAnalyzer": "lucene.english",
  "mappings": {
    "dynamic": false,
    "fields": {
      "HISTORY": {
        "analyzer": "lucene.english",
        "searchAnalyzer": "lucene.english",
        "type": "string"
      },
      "LAB_DATA": {
        "analyzer": "lucene.english",
        "searchAnalyzer": "lucene.english",
        "type": "string"
      },
      "ONSET_DATE": {
        "type": "date"
      },
      "OTHER_MEDS": {
        "type": "string"
      },
      "SYMPTOM_TEXT": {
        "analyzer": "lucene.english",
        "searchAnalyzer": "lucene.english",
        "type": "string"
      },
      "entities": {
        "fields": {
          "ANATOMY": {
            "type": "stringFacet"
          },
          "MEDICAL_CONDITION": {
            "type": "stringFacet"
          },
          "MEDICATION": {
            "type": "stringFacet"
          },
          "TEST_TREATMENT_PROCEDURE": {
            "type": "stringFacet"
          },
          "TREATMENT_NAME": {
            "type": "stringFacet"
          }
        },
        "type": "document"
      }
    }
  },
  "name": "default"
}'