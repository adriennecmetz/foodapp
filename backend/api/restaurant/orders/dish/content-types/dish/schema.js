{
  "kind": "collectionType",
  "collectionName": "dishes",
  "info": {
    "singularName": "dish",
    "pluralName": "dishes",
    "displayName": "Dishes"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "richtext"
    },
    "image": {
      "allowedTypes": [
        "images",
        "files",
        "videos",
        "audios"
      ],
      "type": "media",
      "multiple": false
    },
    "price": {
      "type": "decimal"
    },
    "restaurant": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::restaurant.restaurant",
      "inversedBy": "dishes"
    }
  }
}
