# JSON structure:
```json

"User": {
    "_id": "ObjectId",
    "username": "String",
    "password": "String",
    "profilepicture": "binData",
    "contact": {
        "email": "String",
        "contactNumber": "String"
    },
    "personalAttribute": {
        "firstName": "String",
        "lastName": "String",
        "dob": "Date",
        "gender": "String",
        "height": "Number",
        "weightLog": ["Number", "Number"],
        "goalWeight": "Number",
        "bodyFatLog": ["Number", "Number"],
        "goalBodyFat": "Number",
        "goal": "String",
    },
    "notes": "String",
    "transactionalHistory": [
        {
            "date": "Date",
            "amountRecieved": "Number",
            "pricePerSession": "Number",
            "totalSessions": "Number"
        }
    ],
    "remainingSessions": "Number",
    "sessions": [
        {
            "date": "Date",
            "time": "Time",
            "location": "String"
        }
    ],
    "dietaryRequirements": ["String", "String"],
    "mealPlans": [
        {
            "day1": [
                [{"qty": "String", "foodItem": "String"},{"qty": "String", "foodItem": "String"} ],
                [{"qty": "String", "foodItem": "String"},{"qty": "String", "foodItem": "String"} ]
            ],
            "day2": [
                [{"qty": "String", "foodItem": "String"},{"qty": "String", "foodItem": "String"} ],
                [{"qty": "String", "foodItem": "String"},{"qty": "String", "foodItem": "String"} ]
            ]
        },   
    ]
}

"admin": {
    "_id": "ObjectId",
    "username": "String",
    "password": "String",
    "email": "String",
    "contactNumber": "String"
}
```

# Packages

Sass
```
npm i node-sass
```