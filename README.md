# Details

**Project** : MongoMD's FlexForm - Your EMR system providing digital transformation of paper forms
**Team Number** : 3 
**Team Name** : 💊 MongoMD 💊  
**Demonstration Video** : _Insert link to demonstration video_  

# Overview

MongoMD is a modern tool to assist in modernizing health care and doctor-patient relationships. Using MongoDB, it provides a flexible data model to enter health surveys and other background information into either a web-based application or a mobile application (Android). This is automatically reported on and searchable all within one transactional database. Additionally within the mobile application paper forms can be scanned and uploaded which is then OCR/Analyzed. Lastly, data can be cross-referenced with medical databases for reliability.

# Justification

The inspiration of this app is from a real-world opportunity for legacy modernization in US-Central. It continues the work of vertical demos. Similar use cases in other verticals have also been noticed in New England / Canada and NY Metro.

_Please explain why you decided to build the application/demonstration for this project. What inspired you? What problems does it solve or how will it make Presales activities easier?_
_What MongoDB competitive differentiators (developer productivity, resiliency, scalability, etc.) does this demonstration showcase?_

# Detailed Application Overview
## What it does
This is meant to reduce the amount of paper in doctors offices, insurance companies, or even in the field. As a result, forms can be built dynamically, similar to Microsoft Infopath or Google Forms. Data types can be things like open text fields, checkboxes, drop down lists, etc. This is done via a modern Angular web app.

Once a form is created, it can be answered by doctors, nurses, or other field personnel in that web app or on a mobile Android device which is critically important for areas with bad cell reception.

Additionally, if a form needed to be done with paper, the form can be captured with the mobile app's camera and uploaded when cell signal is available. This is then analyzed for OCR.

## How it works
![](Screenshots/Architecture.png)

* Built on MongoDB Atlas 5.0
* All application logic is stored in Realm App Services functions
* The Web UI is hosted on Realm Static Hosting and written in Angular and calls those functions
* Those functions do basic CRUD as well as Search operations
* An Android app written using Realm Sync and the C#/Xamarin Forms SDK
* CRUD operations are done offline-first with Realm Mobile 
* Search operations call Realm Functions to execute the same Search functions as the Angular app
* The Android app can upload a base64 encoded image of paper forms
* Upon upload, Realm Triggers fire to have AWS Rekognition do TextDetect on the form
* MongoDB Charts can graph results and form data


# Roles and Responsibilities

* Chris Burch - <what did you contribute>
* Nick Gogan - AWS Comprehend integration, Search, Enrichment
* Chris Grabosky - Realm App, Stitch Functions
* Mike Grayson - Document Model, Automation Scripts, Failover Testing
* Sunny Pandit - <what did you contribute>
* Josh Smith - Angular Front End

# Demonstration Script

## Setup

### Laptop Setup
* Ensure Realm CLI is [installed](https://docs.mongodb.com/realm/deploy/realm-cli-reference/#installation), e.g.:

```bash
npm install -g mongodb-realm-cli
```
* Pull this repository
  
### Atlas Setup
* Deploy an Atlas cluster (M10 minimum)
* Create a Realm App

### Sample Data and Indexes
* Navigate to the setup folder in the pulled repository and run mongorestore to load the sample data.

```bash 
tar xvf sample_data.tar.gz  
mongorestore --uri=<connectionString for your Atlas Cluster> dump/
```

* After successfully loading the Sample Data, now we can create the Search Indexes, we'll need some information that the script asks for to be able to interact with the Atlas Search API to create the indexes.

```bash 
./create_indexes.sh
What is your Atlas API Public Key?
<Your Public Key>
What is your Atlas API Private Key?
<Your Private Key>
What is your Atlas PROJECT_ID?
<Project_ID>
What is your Atlas Cluster name?
Cluster0
```

* This should create 3 Search indexes that will help support the different search portions of the application.

### Charts
* TK

### Additional Prep
* Add Realm Email/Password Users

### Import Realm App

* Using the realm-cli you will need to import the Realm App

```bash 
realm-cli push --local "./Realm-App"
```


### Web Frontend
* See walkthrough [here](Frontend/README.md)

### Mobile
* See walkthrough [here](FlexFormMobile/README.md)

### Teardown
* Delete Realm app
* Delete Chart Dashboards
* Delete Cluster


_Demonstration script (or link to script) goes here_

_The demonstration script should provide all the information required for another MongoDB SA to deliver your demonstration to a prospect. This should include:_

* _setup/installation steps_
* _step by step instructions on how to give the demonstration_
* _key points to emphasize at each point in the demonstration_
* _any tear down steps required to reset the demonstration so it is ready for the next time_

# Scoring Rubric Highlights
## Mandatory
* MongoDB version 5.0
* Atlas Search (autocomplete index)

## Optional
* Realm Sync
* Charts
* Realm App Services (functions, auth)

## Bonus Points
* +3 - Real opportunity related
* +5 WOW - OCR upload of hand-written forms which is then searchable
* +2 RC - "Flexible Data Model is an excellent fit for this use case since Forms data can have multiple questions and each have a response"
* +2 RC - "Doctors offices do not always have the best internet connectivity, especially in rural and remote areas so offline-first applications are critical"
* +2 RC - "I want to be able to search and find my results and forms easily" 
* +2 RC - "I want to quickly report on the results"
* +5 Industry Vertical - Legacy Modernization of Health Care
* +3 mLocust - generated sample responses with mLocust
* +3 Cloud Integration - AWS Comprehend Medical integration
* +3 Cloud Integration - AWS Rekognition DetectText
* +10 Multi-Region: Business Continuity under a cloud region outage

## Core Values
* Build Together - built across the entire US in 2 days 
* Make It Matter - this sort of data entry is a problem in rural and remote areas
* Be Intellectually Honest - we thought we would have gotten more done :( 
