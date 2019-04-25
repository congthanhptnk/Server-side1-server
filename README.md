
# Drive Project (Server-side scripting framework course)

A back-end project written in **Node.js, Express.js, Javascript**. The server is used for a Google Drive-like application for manipulating files and folders in a cloud-like environment
## Specification

 School project. Use of the following languages, libraries and frameworks: 

 - Javascript, Node.Js, Express.js
 - Multer, body-parser

## Functionalities

 - Upload files of various types
 - Move, copy, delete files
 - Create and delete folders

## Error codes

 - 200: Request success
 - 400: Client request error
 - 500: Server error

# API

### Upload - POST

    http://localhost:3000/upload
   
Upload a file of any type.
 *Multipart/Form-data*

**Parameters**

| Name  | Description
| -- | -- |
| file | File intended to upload. Attached to request 
| name | Display name for the file |
| time | DateTime |
| type | File type (eg: png, jpg, pdf) |
| location | Path of containing folder |

**Example response**

    { 
	    "_id": "5cbb8abaf054f3fcd62ec32a", 
	    "name": "name1", 
		"time": 1230, 
		"type": "png", 
		"location": "./public/easy", 
		"original": "public/easy/1555794618483-1555787056561-test.png", 
		"__v": 0 
	}

### Get all files and folders - GET

    http://localhost:3000/files

Return all files and folders

**Parameters**

None

**Example response**

    [ 
	    { 
		    "_id": "5cbb6ce2d20163fb8506d379", 
		    "name": "easy", 
		    "time": 1234, 
		    "type": "folder", 
		    "location": "./public", 
		    "original": "./public/easy", 
		    "__v": 0 
		}, 
		{ 
			"_id": "5cbb6cfcd20163fb8506d37a", 
			"name": "easy", 
			"time": 1234, 
			"type": "folder", 
			"location": "./public", 
			"original": "./public/medium", 
			"__v": 0 
		}, 
		{ 
			"_id": "5cbb6d2ed20163fb8506d380", 
			"name": "4", "time": 111111, 
			"type": "png", 
			"location": "./public/medium", 
			"original": "./public/medium/1555787054004-test.png", 
			"__v": 0 
		} 
	]

### Delete all files and folders - DELETE

    http://localhost:3000/files
   
Delete every files and folders

**Parameters**

None

**Example response**

    Delete all

### Delete single file - DELETE

    http://localhost:3000/files/{fileId}

Delete requested file

**Parameters**

| Name  | Description
| -- | -- |
|fileId | id of file intended to delete. Url param |

**Example response**

   Deleted

### Get single file - GET

    http://localhost:3000/files/fileId/{fileId}
   
Return requested file

**Parameters**

| Name  | Description
| -- | -- |
|fileId | id of file intended to get. Url param |

**Example response**

    { 
	    "_id": "5cbb8abaf054f3fcd62ec32a", 
	    "name": "name1", 
		"time": 1230, 
		"type": "png", 
		"location": "./public/easy", 
		"original": "public/easy/1555794618483-1555787056561-test.png", 
		"__v": 0 
	}

### Get contents of a folder - POST

    http://localhost:3000/files/folder
   
Get all files and folders belong to requested folder
 *x-www-urlencoded*

**Parameters**

| Name  | Description
| -- | -- |
|location | Path of the folder|

**Example response**

    [
	    { 
		    "_id": "5cc1a3b7face473ac2664ec1", 
		    "name": "easy", 
			"time": 1230, 
			"type": "folder", 
			"location": "./public", 
			"original": "public/easy", 
			"__v": 0 
		},
		{ 
		    "_id": "5cc1a3b7face473ac2664ec1", 
		    "name": "name1", 
			"time": 1230, 
			"type": "png", 
			"location": "./public/easy", 
			"original": "public/easy/1555794618483-1555787056561-test.png", 
			"__v": 0 
		}
	]

### Move file - POST

    http://localhost:3000/files/move
   
Move a file to requested location
 *x-www-urlencoded*

**Parameters**

| Name  | Description
| -- | -- |
| oldLoc | Current location of file
| newLoc | New location for the file |
| original | Path of file |

**Example response** (new path of file)

    ./public/folder1/image.png


### Create new folder - POST

    http://localhost:3000/folders
   
Create a new folder at the requested location
 *x-www-urlencoded*

**Parameters**

| Name  | Description
| -- | -- |
|location | Intended location of the new folder 
| name | Name of new folder |
| time | Date time |

**Example response**

    Folder created

### Delete folder - DELETE

    http://localhost:3000/folders
   
Delete requested folder and all of its content
 *x-www-urlencoded*

**Parameters**

| Name  | Description
| -- | -- |
|location | Path of folder |

**Example response**

    Folder deleted
