# Details

**Project** : MongoMD's FlexForm - Your EMR system providing digital transformation of paper forms
**Team Number** : 3 
**Team Name** : 💊 MongoMD 💊  
**Demonstration Video** : _Insert link to demonstration video_  

# Overview

MongoMD is a modern tool to assist in modernizing health care and doctor-patient relationships. Using MongoDB, it provides a flexible data model to enter health surveys and other background information into either a web-based application or a mobile application (Android). This is automatically reported on and searchable. Additionally within the mobile application paper forms can be scanned and uploaded which is then OCR/Analyzed. Lastly, data can be cross-referenced with medical databases for reliability.

# Justification

This is based on a real-world opportunity for legacy modernization in US-Central. It continues the work of vertical demos.   Similiar use cases in other verticals have also been noticed in New England / Canada and NY Metro. 

_Please explain why you decided to build the application/demonstration for this project. What inspired you? What problems does it solve or how will it make Presales activities easier?_
_What MongoDB competitive differentiators (developer productivity, resiliency, scalability, etc.) does this demonstration showcase?_

# Detailed Application Overview

_Describe the architecture of your application and include a diagram._
_List all the MongoDB components/products used in your demonstration._
_Describe what you application does and how it works_


# Roles and Responsibilities

* Chris Burch - <what did you contribute>
* Nick Gogan - AWS Comprehend integration, Search, Enrichment
* Chris Grabosky - Realm App, Stitch Functions
* Mike Grayson - Document Model, Automation Scripts, Failover Testing
* Sunny Pandit - <what did you contribute>
* Josh Smith - Angular Front End

# Demonstration Script

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
