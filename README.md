#CUSTOM API FOR A NOTE-TAKING APPLICATION
An API for a note taking application with simple functionalities. The functionalities are :
1. Read (Using GET requests)
2. Create (Using POST requests)
3. Edit (Using PATCH requests)
4. Delete (Using DELETE requests)

##READING NOTES

`GET` requests can be used in two ways to read the notes stored already in the database.

###READING ALL THE NOTES STORED IN THE DATABASE:

Example Request: GET http://localhost:3000/notes/

Example Response: 

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



