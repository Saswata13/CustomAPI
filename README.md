# CUSTOM NOTE-KEEPING API
This is a basic API for a notekeeping application which allows the user to read, create, edit and delete notes. The HTTP methods used here are:
```
1. GET
2. POST
3. PATCH
4. DELETE
```
All the responses received are in JSON format. `POST` and `PATCH` requests have to be made in valid JSON format. A detailed overview of status codes encountered is also given.

# OVERVIEW 
This API allows users to read, create, edit and delete notes from a database. Once a note is created, it is stored as a javascript object in an array. The javascript object has the following property-value pairs:
```
PROPERTY  |  VALUE
          |
_id       |  Stores the unique id assigned to a note by mongoose
          |
title     |  Stores the title of a particular note
          |
contents  |  Stores the main body of the note
```

## Response Codes 
### Response Codes
```
200: Success
201: Successfully Updated
404: Entity cannot be found
400: Bad Request
500: Internal Server Error
```
**REQUESTS AND RESPONSES:**
### Reading all the notes: Allows the user to take a look at all the notes present in the database.
```
REQUEST: GET http://localhost:3000/notes/
```
**Successful Response:**

```json
[
    {
        "_id": "5edca64d1f219f75a8bfd228",
        "title": "Note 1",
        "contents": "Hello, anyone there?",
        "__v": 0
    },
    {
        "_id": "5edcaf03e4b17978a8829983",
        "title": "Note 3",
        "contents": "It is lunchtime",
        "__v": 0
    }
]
```

**Failed Response:**
```json
{
    "error": {
        "message": "Not Found"
    }
}
``` 
### Reading a particular note: Allows the user to read a particular note stored in the database. The ID of the note should be passed in the request URL link.
```
REQUEST: GET http://localhost:3000/notes/5edcaf03e4b17978a8829983
```
## Successful Response:

```json

   {
        "_id": "5edcaf03e4b17978a8829983",
        "title": "Note 3",
        "contents": "It is lunchtime",
        "__v": 0
    }
    
```

## Failed Response:
**IF ID DOES NOT EXIST:**
```json
{
    "message": "Requested entry not found"
}
``` 
**IF ID ENTERED DOES NOT MATCH THE FORMAT OF THE ID RENDERED BY MONGOOSE:**
```json
{
  {
    "error": {
        "stringValue": "\"5edcada1e20b39693436c2\"",
        "kind": "ObjectId",
        "value": "5edcada1e20b39693436c2",
        "path": "_id",
        "reason": {}
    }
}
}
``` 

### Creating new notes: Allows the user to create a new note and add it to the database.
```
REQUEST: POST http://localhost:3000/notes/
BODY:(IN PROPER JSON FORMAT)
{
  "title": "Note 2",
  "contents": "Today I need to get the groceries"
}

```
## Successful Response:

```json
{
    "message": "handling post requests",
    "createdNote": {
        "_id": "5ede21c08e8b1e3ed44fa31e",
        "title": "Note 2",
        "contents": "Today I need to get the groceries",
        "__v": 0
    }
}
```

##  Failed Response:
**IF REQUEST IS MADE TO INCORRECT URL:**
```json
{
    "error": {
        "message": "Not Found"
    }
}
``` 
**IF JSON FORMAT IS NOT IMPLEMENTED CORRECTLY:**
```json
{
    "error": {
        "message": "The Error Message"
    }
}
``` 
### Editing notes: Allows the user to edit notes from the database. ID of the note should be passed in the request URL link.
```
REQUEST: PATCH http://localhost:3000/notes/
BODY:(IN PROPER JSON FORMAT)
[
	{ "propName": "contents", "value": "Need to go to the laundry"}
]

```
## Successful Response:

```json
{
    "n": 1,
    "nModified": 1,
    "opTime": {
        "ts": "6835954279996459961",
        "t": 5
    },
    "electionId": "7fffffff0000000000000005",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6835954279996459961",
        "signature": {
            "hash": "DLqw8o0ovsa4PoVV2gta4j9Sobg=",
            "keyId": "6833741641694576643"
        }
    },
    "operationTime": "6835954279996459961"
}
```
Send a GET request again to the specified ID to check if the changes were applied or not.

##  Failed Response:
**IF REQUEST BODY IS NOT PASSED AS AN ARRAY:**
```json
{
    "error": {
        "message": "req.body is not iterable"
    }
}
``` 
**IF JSON FORMAT IS NOT IMPLEMENTED CORRECTLY:**
```json
{
    "error": {
        "message": "The Error Message"
    }
}
``` 
**IF ID ENTERED DOES NOT MATCH THE FORMAT OF THE ID RENDERED BY MONGOOSE:**
```json
{
  {
    "error": {
        "stringValue": "\"5edcada1e20b39693436c2\"",
        "kind": "ObjectId",
        "value": "5edcada1e20b39693436c2",
        "path": "_id",
        "reason": {}
    }
}
}
```
**IF REQUEST IS MADE TO INCORRECT URL:**
```json
{
    "error": {
        "message": "Not Found"
    }
}
``` 
### Deleting a particular note: Allows the user to delete a particular note from the database. ID of the note should be passed in the request URL
```
REQUEST: DELETE http://localhost:3000/notes/5edca64d1f219f75a8bfd228
```
**Successful Response:**

```json
{
    "n": 1,
    "opTime": {
        "ts": "6835957582826307585",
        "t": 5
    },
    "electionId": "7fffffff0000000000000005",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6835957582826307585",
        "signature": {
            "hash": "F6v5/G23NPBWe/A1t3xclUzF31I=",
            "keyId": "6833741641694576643"
        }
    },
    "operationTime": "6835957582826307585",
    "deletedCount": 1
}
```

**Failed Response:**
**IF REQUEST IS MADE TO INCORRECT URL:**
```json
{
    "n": 0,
    "opTime": {
        "ts": "6835957737445130243",
        "t": 5
    },
    "electionId": "7fffffff0000000000000005",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6835957737445130243",
        "signature": {
            "hash": "MHHQFC11ncbzCljmslx27ukkqXc=",
            "keyId": "6833741641694576643"
        }
    },
    "operationTime": "6835957737445130243",
    "deletedCount": 0
}
``` 
**IF ID ENTERED DOES NOT MATCH THE FORMAT OF THE ID RENDERED BY MONGOOSE:**
```json
{
  {
    "error": {
        "stringValue": "\"5edcada1e20b39693436c2\"",
        "kind": "ObjectId",
        "value": "5edcada1e20b39693436c2",
        "path": "_id",
        "reason": {}
    }
}
}
```





