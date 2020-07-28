define({ "api": [
  {
    "type": "Schema",
    "url": "Category",
    "title": "Schema, stating categories properties",
    "name": "CategorySchema",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Title",
            "description": "<p>Name of the category.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>A little description of the category and its principal caracteristics.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/models/category.model.js",
    "groupTitle": "Category"
  },
  {
    "type": "Post",
    "url": "/category",
    "title": "Create a category",
    "name": "CreateCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Title",
            "description": "<p>The name of the category.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>A bit of information about the category.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Title",
            "description": "<p>The name of the category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>A bit of information about the category.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Categoriy",
            "description": "<p>The category as a consultable object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Category created\n{\n  \"category\": {\n      \"id\": \"(random_string)\",\n      \"title\": \"Confiture\",\n      \"description\": \"La confiture ça dégouline, ça passe par les trous d'la tartine.\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error400",
            "description": "<p>Bad input.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad input\n{\n  \"error\": \"BadInput\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.js",
    "groupTitle": "Category"
  },
  {
    "type": "delete",
    "url": "/category/:id",
    "title": "Delete a category",
    "name": "DeleteCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "CategoryId",
            "description": "<p>The id of the category, generated at its creation.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Category deleted",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>Category not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Category not found\n{\n  \"error\": \"CategoryNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.js",
    "groupTitle": "Category"
  },
  {
    "type": "Get",
    "url": "/category",
    "title": "Return all categories",
    "name": "GetCategoryInformation",
    "group": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Categories",
            "description": "<p>The categories as consultables objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"category\": {\n      \"id\": \"(random_string)\",\n      \"title\": \"Confiture\",\n      \"description\": \"La confiture ça dégouline, ça passe par les trous d'la tartine.\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"error\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.js",
    "groupTitle": "Category"
  },
  {
    "type": "Get",
    "url": "/category/:title",
    "title": "Return category information",
    "name": "GetCurrentCategoryInformation",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Title",
            "description": "<p>Used to retrieve the category.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Category",
            "description": "<p>The category and all its data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"category\": {\n      \"title\": \"Confiture\",\n      \"description\": \"La confiture ça dégouline, ça passe par les trous d'la tartine.\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>Category not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Category not found\n{\n  \"error\": \"CategoryNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.js",
    "groupTitle": "Category"
  },
  {
    "type": "Put",
    "url": "/category/:id",
    "title": "Update a category",
    "name": "UpdateCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "CategoryId",
            "description": "<p>The id of the category, generated at its creation.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Title",
            "description": "<p>The name of the category.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>A bit of information about the category.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Category",
            "description": "<p>The category as a consultable object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Category updated\n{\n  \"category\": {\n      \"id\": \"(random_string)\",\n      \"title\": \"Confiture\",\n      \"description\": \"La confiture ça dégouline, ça passe par les trous d'la tartine.\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error400",
            "description": "<p>Bad input.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad input\n{\n  \"error\": \"BadInput\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/category.routes.js",
    "groupTitle": "Category"
  },
  {
    "type": "Post",
    "url": "/order",
    "title": "Create order",
    "name": "CreateOrder",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "AccessToken",
            "description": "<p>Checks user identification, if the user is connected.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Order",
            "description": "<p>Order to be created.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Order",
            "description": "<p>Order created.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Order added\n{\n  \"order\": {\n      \"id\": \"(random_string)\",\n      \"date\": \"01/01/2010\",\n      \"price\": \"420\",\n      \"status\": \"En préparation\",\n      \"product\": {\n          \"id\": \"(random_string)\",\n          \"name\": \"Chutney de mangue\",\n          \"description\": \"Un truc plutot pas mal\",\n          \"price\": \"5.49\",\n          \"image\":\"(url)\",\n          \"inStock\": \"false\",\n          \"favorites\": \"false\",\n          \"category\": {\n              \"id\": \"(random_string)\",\n              \"title\": \"chutney\",\n              \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n          }\n      },\n      \"itemsCount\": {\n          \"_id\": \"(productId)\",\n          \"count\": \"2\"\n      },\n      \"user\": {\n         \"id\": \"(random_string)\",\n         \"firstname\": \"Jack\",\n         \"lastname\": \"Sparrow\",\n         \"email\": \"Jack.Sparrow@Captain.com\",\n         \"password\": \"hashed_string\",\n         \"admin\": \"false\",\n         \"adress\": {\n             \"numberAndStreet\": \"2 rue du gros bateau\",\n             \"city\": \"Tortuga\",\n             \"zip\": \"75012\"         \n         }       \n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error400",
            "description": "<p>Bad input</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad input\n{\n  \"error\": \"BadInput\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/order.routes.js",
    "groupTitle": "Order"
  },
  {
    "type": "Delete",
    "url": "/order/:orderId",
    "title": "Delete one order",
    "name": "DeleteOneOrderById",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "OrderId",
            "description": "<p>allow order identification.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Order deleted",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>Order not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Order not found\n{\n  \"error\": \"OrderNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/order.routes.js",
    "groupTitle": "Order"
  },
  {
    "type": "Get",
    "url": "/order/all",
    "title": "Return all orders. Admin usage",
    "name": "GetAllOrdersAsAdmin",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "Admin",
            "description": "<p>State the access level of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>Product ordered by the customer.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>Used to associate an order to a customer.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Order",
            "description": "<p>All orders from all users.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"order\": {\n      \"id\": \"(random_string)\",\n      \"date\": \"01/01/2010\",\n      \"price\": \"420\",\n      \"status\": \"En préparation\",\n      \"user\": {\n         \"id\": \"(random_string)\",\n         \"firstname\": \"Jack\",\n         \"lastname\": \"Sparrow\",\n         \"email\": \"Jack.Sparrow@Captain.com\",\n         \"password\": \"hashed_string\",\n         \"admin\": \"false\",\n         \"adress\": {\n             \"numberAndStreet\": \"2 rue du gros bateau\",\n             \"city\": \"Tortuga\",\n             \"zip\": \"75012\"         \n         }       \n      },\n      \"product\": {\n          \"id\": \"(random_string)\",\n          \"name\": \"Chutney de mangue\",\n          \"description\": \"Un truc plutot pas mal\",\n          \"price\": \"5.49\",\n          \"image\":\"(url)\",\n          \"inStock\": \"false\",\n          \"favorites\": \"false\",\n          \"category\": {\n              \"title\": \"chutney\",\n              \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n          }\n      },\n      \"itemsCount\": {\n          \"_id\": \"(productId)\",\n          \"count\": \"2\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error403",
            "description": "<p>Admin privileges requested.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Admin privileges\n{\n  \"error\": \"AdminPrivileges\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/order.routes.js",
    "groupTitle": "Order"
  },
  {
    "type": "Get",
    "url": "/order",
    "title": "Return all orders. User usage",
    "name": "GetAllOrdersAsUser",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>Identification of user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Order",
            "description": "<p>All orders from one user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"order\": {\n      \"id\": \"(random_string)\",\n      \"date\": \"01/01/2010\",\n      \"price\": \"420\",\n      \"status\": \"En préparation\",\n      \"product\": {\n          \"id\": \"(random_string)\",\n          \"name\": \"Chutney de mangue\",\n          \"description\": \"Un truc plutot pas mal\",\n          \"price\": \"5.49\",\n          \"image\":\"(url)\",\n          \"inStock\": \"false\",\n          \"favorites\": \"false\",\n          \"category\": {\n              \"id\": \"(random_string)\",\n              \"title\": \"chutney\",\n              \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n          }\n      },\n      \"itemsCount\": {\n          \"_id\": \"(productId)\",\n          \"count\": \"2\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"error\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/order.routes.js",
    "groupTitle": "Order"
  },
  {
    "type": "Get",
    "url": "/order/:orderId",
    "title": "Return one order. User usage",
    "name": "GetOneOrderById",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "OrderId",
            "description": "<p>Allow order identification.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Order",
            "description": "<p>All orders from one user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"order\": {\n      \"id\": \"(random_string)\",\n      \"date\": \"01/01/2010\",\n      \"price\": \"420\",\n      \"status\": \"En préparation\",\n      \"product\": {\n          \"id\": \"(random_string)\",\n          \"name\": \"Chutney de mangue\",\n          \"description\": \"Un truc plutot pas mal\",\n          \"price\": \"5.49\",\n          \"image\":\"(url)\",\n          \"inStock\": \"false\",\n          \"favorites\": \"false\",\n          \"category\": {\n              \"id\": \"(random_string)\",\n              \"title\": \"chutney\",\n              \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n          }\n      },\n      \"itemsCount\": {\n          \"_id\": \"(productId)\",\n          \"count\": \"2\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>Order not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Order not found\n{\n  \"error\": \"OrderNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/order.routes.js",
    "groupTitle": "Order"
  },
  {
    "type": "Schema",
    "url": "Order",
    "title": "Schema, stating orders properties",
    "name": "OrderSchema",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "Date",
            "description": "<p>Day on which the order was placed.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Price",
            "description": "<p>Price of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Status",
            "description": "<p>State of the order: &quot;Cancelled&quot;, &quot;In progres&quot;, &quot;Ready&quot;...</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Products",
            "description": "<p>Products included in the order.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "UserId",
            "description": "<p>Individual Id allowing customer identification.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "ItemsCount",
            "description": "<p>Number of items inside the cart.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/models/order.model.js",
    "groupTitle": "Order"
  },
  {
    "type": "Patch",
    "url": "/order/:id",
    "title": "To patch one order information. Admin usage",
    "name": "PatchOrderInformation",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique. Used to retrieve orders.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Order",
            "description": "<p>Order and all its data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Order patched\n{\n  \"order\": {\n      \"id\": \"(random_string)\",\n      \"date\": \"01/01/2010\",\n      \"price\": \"420\",\n      \"status\": \"En préparation\",\n      \"product\": {\n          \"id\": \"(random_string)\",\n          \"name\": \"Chutney de mangue\",\n          \"description\": \"Un truc plutot pas mal\",\n          \"price\": \"5.49\",\n          \"image\":\"(url)\",\n          \"inStock\": \"false\",\n          \"favorites\": \"false\",\n          \"category\": {\n              \"id\": \"(random_string)\",\n              \"title\": \"chutney\",\n              \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n          }\n      },\n      \"itemsCount\": {\n          \"_id\": \"(productId)\",\n          \"count\": \"2\"\n      },\n      \"user\": {\n         \"id\": \"(random_string)\",\n         \"firstname\": \"Jack\",\n         \"lastname\": \"Sparrow\",\n         \"email\": \"Jack.Sparrow@Captain.com\",\n         \"password\": \"hashed_string\",\n         \"admin\": \"false\",\n         \"adress\": {\n             \"numberAndStreet\": \"2 rue du gros bateau\",\n             \"city\": \"Tortuga\",\n             \"zip\": \"75012\"         \n         }       \n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error400",
            "description": "<p>Bad input.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error403",
            "description": "<p>Access forbidden.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad input\n{\n  \"error\": \"BadInput\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/order.routes.js",
    "groupTitle": "Order"
  },
  {
    "type": "Put",
    "url": "/order/:orderId",
    "title": "Update order",
    "name": "UpdateOneOrderById",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "AccessToken",
            "description": "<p>Checks user identification.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "OrderId",
            "description": "<p>Allow order identification.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Order",
            "description": "<p>Order to be updated.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Order",
            "description": "<p>Order updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Order updated\n{\n  \"order\": {\n      \"id\": \"(random_string)\",\n      \"price\": \"420\",\n      \"status\": \"En préparation\",\n      \"product\": {\n          \"id\": \"(random_string)\",\n          \"name\": \"Chutney de mangue\",\n          \"description\": \"Un truc plutot pas mal\",\n          \"price\": \"5.49\",\n          \"image\":\"(url)\",\n          \"inStock\": \"false\",\n          \"favorites\": \"false\",\n          \"category\": {\n              \"id\": \"(random_string)\",\n              \"title\": \"chutney\",\n              \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n          }\n      },\n      \"itemsCount\": {\n          \"_id\": \"(productId)\",\n          \"count\": \"2\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>Order not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Order not found\n{\n  \"error\": \"OrderNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/order.routes.js",
    "groupTitle": "Order"
  },
  {
    "type": "Post",
    "url": "/product",
    "title": "Add a product",
    "name": "AddProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "Admin",
            "description": "<p>State the access level of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>Name of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>A description of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Price",
            "description": "<p>The price of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Image",
            "description": "<p>An image of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Category",
            "description": "<p>The category of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "InStock",
            "description": "<p>State the disponibility of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "Favorites",
            "description": "<p>Display the product in homepage if true.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>All products to order as consultable objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Product added\n{\n  \"product\": {\n      \"name\": \"Chutney de mangue\",\n      \"description\": \"Un truc plutot pas mal\",\n      \"price\": \"5.49\",\n      \"image\":\"(url)\",\n      \"inStock\": \"false\",\n      \"favorites\": \"false\",\n      \"category\": {\n          \"title\": \"chutney\",\n          \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error403",
            "description": "<p>Access forbidden.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"error\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/product.routes.js",
    "groupTitle": "Product"
  },
  {
    "type": "Get",
    "url": "/product/browse?query=olive",
    "title": "Return products that match a query",
    "name": "BrowseByQuery",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Query",
            "description": "<p>Query to be performed among products (to be sent as query and not as param).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>All products matching the query.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"product\": {\n      \"name\": \"Chutney de mangue\",\n      \"description\": \"Un truc plutot pas mal\",\n      \"price\": \"5.49\",\n      \"image\":\"(url)\",\n      \"inStock\": \"false\",\n      \"favorites\": \"false\",\n      \"category\": {\n          \"title\": \"chutney\",\n          \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>No result found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n  \"error\": \"No result found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/product.routes.js",
    "groupTitle": "Product"
  },
  {
    "type": "Get",
    "url": "/product/browse/advanced?query=olive&categories=123456,789012",
    "title": "Return products that match a query among specific categories",
    "name": "BrowseByQueryAndCategory",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Query",
            "description": "<p>Query to be performed among products (to be sent as query and not as param).</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "CategoryId",
            "description": "<p>Identification of the categories (to be sent as query and not as param).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>All products matching the query among the selected categories.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"product\": {\n      \"name\": \"Chutney de mangue\",\n      \"description\": \"Un truc plutot pas mal\",\n      \"price\": \"5.49\",\n      \"image\":\"(url)\",\n      \"inStock\": \"false\",\n      \"favorites\": \"false\",\n      \"category\": {\n          \"title\": \"chutney\",\n          \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>No result found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n  \"error\": \"No result found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/product.routes.js",
    "groupTitle": "Product"
  },
  {
    "type": "Delete",
    "url": "/product/:id",
    "title": "Delete product",
    "name": "DeleteProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "ProductId",
            "description": "<p>Identification of the product.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Product deleted",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error403",
            "description": "<p>Access forbidden.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>Product not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Product not found\n{\n  \"error\": \"ProductNotfound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/product.routes.js",
    "groupTitle": "Product"
  },
  {
    "type": "Get",
    "url": "/product",
    "title": "Return all products",
    "name": "GetAllProducts",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>Name of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>A description of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Price",
            "description": "<p>The price of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Image",
            "description": "<p>An image of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Category",
            "description": "<p>The category of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "InStock",
            "description": "<p>State the disponibility of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "Favorites",
            "description": "<p>Display the product in homepage if true.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>All products to order as consultable objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"product\": {\n      \"name\": \"Chutney de mangue\",\n      \"description\": \"Un truc plutot pas mal\",\n      \"price\": \"5.49\",\n      \"image\":\"(url)\",\n      \"inStock\": \"false\",\n      \"favorites\": \"false\",\n      \"category\": {\n          \"title\": \"chutney\",\n          \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"error\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/product.routes.js",
    "groupTitle": "Product"
  },
  {
    "type": "Get",
    "url": "/product/category?categories=123456,789240",
    "title": "Return all products by category",
    "name": "GetAllProductsByCategory",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "CategoryId",
            "description": "<p>Identification of the categories (to be sent as query and not as param).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>All products associated with selected category.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"product\": {\n      \"name\": \"Chutney de mangue\",\n      \"description\": \"Un truc plutot pas mal\",\n      \"price\": \"5.49\",\n      \"image\":\"(url)\",\n      \"inStock\": \"false\",\n      \"favorites\": \"false\",\n      \"category\": {\n          \"title\": \"chutney\",\n          \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>Category not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Category not found\n{\n  \"error\": \"CategoryNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/product.routes.js",
    "groupTitle": "Product"
  },
  {
    "type": "Get",
    "url": "/product/:id",
    "title": "Return product by id",
    "name": "GetProductById",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "ProductId",
            "description": "<p>Identification of the product.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>Retuen a product associated with selected id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"product\": {\n      \"name\": \"Chutney de mangue\",\n      \"description\": \"Un truc plutot pas mal\",\n      \"price\": \"5.49\",\n      \"image\":\"(url)\",\n      \"inStock\": \"false\",\n      \"favorites\": \"false\",\n      \"category\": {\n          \"title\": \"chutney\",\n          \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>Product not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Product not found\n{\n  \"error\": \"ProductNotfound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/product.routes.js",
    "groupTitle": "Product"
  },
  {
    "type": "Get",
    "url": "/product/cart/:id",
    "title": "To get product and push them into the cart",
    "name": "GetProductsIntoCart",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "ProductId",
            "description": "<p>The ids of the ordered products.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>Products send and displayed in the cart.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"product\": {\n      \"name\": \"Chutney de mangue\",\n      \"description\": \"Un truc plutot pas mal\",\n      \"price\": \"5.49\",\n      \"image\":\"(url)\",\n      \"inStock\": \"false\",\n      \"favorites\": \"false\",\n      \"category\": {\n          \"title\": \"chutney\",\n          \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"error\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/product.routes.js",
    "groupTitle": "Product"
  },
  {
    "type": "Patch",
    "url": "/product/:id",
    "title": "To patch one product information. Admin usage",
    "name": "PatchProductInformation",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique. Used to retrieve products.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>Product and all its data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Product patched\n{\n  \"product\": {\n      \"name\": \"Chutney de mangue\",\n      \"description\": \"Un truc plutot pas mal\",\n      \"price\": \"5.49\",\n      \"image\":\"(url)\",\n      \"inStock\": \"false\",\n      \"favorites\": \"false\",\n      \"category\": {\n          \"title\": \"chutney\",\n          \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error400",
            "description": "<p>Bad input.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error03",
            "description": "<p>Access forbidden.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad input\n{\n  \"error\": \"BadInput\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/product.routes.js",
    "groupTitle": "Product"
  },
  {
    "type": "Schema",
    "url": "Product",
    "title": "Schema, stating products properties",
    "name": "ProductSchema",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>Name of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>A short description of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Price",
            "description": "<p>Price of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Image",
            "description": "<p>A picture of the product as an URL.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "InStock",
            "description": "<p>Attribute stating the disponibility of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Category",
            "description": "<p>Product's category of aliment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "Favorite",
            "description": "<p>State the status of the product, to eventually be promoted in homepage.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/models/product.model.js",
    "groupTitle": "Product"
  },
  {
    "type": "Put",
    "url": "/product",
    "title": "Update a product",
    "name": "UpdateProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "Admin",
            "description": "<p>State the access level of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "ProductId",
            "description": "<p>Identification of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>Name of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>A description of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Price",
            "description": "<p>The price of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Image",
            "description": "<p>An image of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Category",
            "description": "<p>The category of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "InStock",
            "description": "<p>State the disponibility of the product.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "Favorites",
            "description": "<p>Display the product in homepage if true.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>All products to order as consultable objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Product updated\n{\n  \"product\": {\n      \"name\": \"Chutney de mangue\",\n      \"description\": \"Un truc plutot pas mal\",\n      \"price\": \"5.49\",\n      \"image\":\"(url)\",\n      \"inStock\": \"false\",\n      \"favorites\": \"false\",\n      \"category\": {\n          \"title\": \"chutney\",\n          \"description\": \"Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices.\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error403",
            "description": "<p>Access forbidden.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"error\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/product.routes.js",
    "groupTitle": "Product"
  },
  {
    "type": "delete",
    "url": "/auth",
    "title": "Delete user",
    "name": "DeleteCurrentUserInformation",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>Associated token to find the user.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 User deleted",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"error\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "Delete",
    "url": "/user/:userId",
    "title": "Delete user. Admin usage",
    "name": "DeleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "_Id",
            "description": "<p>Unique. Used to retrieve users for deletion.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 User deleted",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error403",
            "description": "<p>Access forbidden.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 User not found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "Get",
    "url": "/auth",
    "title": "Return user information",
    "name": "GetCurrentUserInformation",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "AccessToken",
            "description": "<p>Used to retrieve the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>The user and all its data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"user\": {\n      \"id\": \"(random_string)\",\n      \"firstname\": \"Jack\",\n      \"lastname\": \"Sparrow\",\n      \"email\": \"Jack.Sparrow@Captain.com\",\n      \"password\": \"(hashed_string)\",\n      \"admin\": \"false\",\n      \"adress\": {\n          \"numberAndStreet\": \"2 rue du gros bateau\",\n          \"city\": \"Tortuga\",\n          \"zip\": \"75012\"         \n      }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"error\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "Get",
    "url": "/user",
    "title": "Return all users/one user information(s). Admin usage",
    "name": "GetUserInformation",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Unique. Used to retrieve users.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>All users and all user's datas (except status &amp; password).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n      \"id\": \"(random_string)\",\n      \"firstname\": \"Jack\",\n      \"lastname\": \"Sparrow\",\n      \"email\": \"Jack.Sparrow@Captain.com\",\n      \"admin\": \"false\"\n      \"adress\": {\n          \"numberAndStreet\": \"2 rue du gros bateau\",\n          \"city\": \"Tortuga\",\n          \"zip\": \"75012\"         \n      }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error403",
            "description": "<p>Access forbidden.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Access forbidden\n{\n  \"error\": \"AccessForbidden\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "Post",
    "url": "/auth/login",
    "title": "Login user",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>Password affiliated with a unique email adress, verified and crypted.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>Password affiliated with a unique email adress, verified and crypted.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Admin",
            "description": "<p>Access level of the user. The admin has no limit.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>Token (access and refresh). Used to identify the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 User successfully connected\n {\n   \"tokens\": {\n       \"accessToken\": \"(string_jwt)\",\n       \"refresh()\": \"(random_string)\"\n    }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error401",
            "description": "<p>Email not found. / Password and email do not match.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Email not found\n{\n  \"error\": \"EmailNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "Patch",
    "url": "/user/:id",
    "title": "To patch one user information. Admin usage",
    "name": "PatchUserInformation",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique. Used to retrieve users.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>User and all its data (except password).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 User patched\n{\n  \"user\": {\n      \"id\": \"(random_string)\",\n      \"firstname\": \"Jack\",\n      \"lastname\": \"Sparrow\",\n      \"email\": \"Jack.Sparrow@Captain.com\",\n      \"phone\": \"06 23 45 67 89\"\n      \"adress\": {\n          \"numberAndStreet\": \"2 rue du gros bateau\",\n          \"city\": \"Tortuga\",\n          \"zip\": \"75012\"         \n      }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error400",
            "description": "<p>Bad input.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad input\n{\n  \"error\": \"BadInput\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "Post",
    "url": "/auth/token",
    "title": "Refresh token",
    "name": "RefreshToken",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "AccessToken",
            "description": "<p>Used to identify the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "RefreshToken",
            "description": "<p>Used to identify the user. Randomized again.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"token\": {\n      \"refresh()\": \"(random_string)\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error401",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Email not found\n{\n  \"error\": \"InvalidToken\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "Post",
    "url": "/auth/register",
    "title": "Register user",
    "name": "RegisterUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "FirstName",
            "description": "<p>Firstname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "LastName",
            "description": "<p>Lastname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>Password affiliated with a unique email adress, verified and crypted.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Phone",
            "description": "<p>User's telephonic contact. has to match a 10 digit phone number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Address",
            "description": "<p>User's home location. Asked to prevent irresponsable orders (if the client has to drive 200km to get 2 potatoes).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "NumberAndStreet",
            "description": "<p>Part of the user adress.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "City",
            "description": "<p>Used to locate the user. Jardin Cabellio sells locally only.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Zip",
            "description": "<p>User's postal code.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "FirstName",
            "description": "<p>Firstname of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "LastName",
            "description": "<p>Lastname of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>Password affiliated with a unique email adress, verified and crypted.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Admin",
            "description": "<p>Access level of the user. The admin has no limit.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Phone",
            "description": "<p>User's telephonic contact. has to match a 10 digit phone number.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Address",
            "description": "<p>User's home location. Asked to prevent irresponsable orders (if the client has to drive 200km to get 2 potatoes).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "NumberAndStreet",
            "description": "<p>Part of the user adress.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "City",
            "description": "<p>Used to locate the user. Jardin Cabellio sells locally only.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Zip",
            "description": "<p>User's postal code.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>Token (access and refresh). Used to identify the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 User successfully registered\n {\n   \"tokens\": {\n       \"accessToken\": \"(string_jwt)\",\n       \"refresh()\": \"(random_string)\"\n    }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error400",
            "description": "<p>Bad request.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error401",
            "description": "<p>Email already exists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Email Already Taken\n{\n  \"error\": \"EmailAlreadyTaken\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "Put",
    "url": "/auth",
    "title": "Update user informations",
    "name": "UpdateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "FirstName",
            "description": "<p>Firstname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "LastName",
            "description": "<p>Lastname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>Password affiliated with a unique email adress, verified and crypted.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Phone",
            "description": "<p>User's telephonic contact. has to match a 10 digit phone number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Address",
            "description": "<p>User's home location. Asked to prevent irresponsable orders (if the client has to drive 200km to get 2 potatoes).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "NumberAndStreet",
            "description": "<p>Part of the user adress.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "City",
            "description": "<p>Used to locate the user. Jardin Cabellio sells locally only.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Zip",
            "description": "<p>User's postal code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>Token (access and refresh). Used to identify the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "FirstName",
            "description": "<p>Firstname of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "LastName",
            "description": "<p>Lastname of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Phone",
            "description": "<p>User's telephonic contact. has to match a 10 digit phone number.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Address",
            "description": "<p>User's home location. Asked to prevent irresponsable orders (if the client has to drive 200km to get 2 potatoes).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "NumberAndStreet",
            "description": "<p>Part of the user adress.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "City",
            "description": "<p>Used to locate the user. Jardin Cabellio sells locally only.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Zip",
            "description": "<p>User's postal code.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>Token (access and refresh). Used to identify the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 User successfully updated\n {\n    \"id\": \"(random_string)\",\n    \"firstname\": \"Jack\",\n    \"lastname\": \"Sparrow\",\n    \"email\": \"Jack.Sparrow@Captain.com\",\n    \"adress\": {\n        \"numberAndStreet\": \"2 rue du gros bateau\",\n        \"city\": \"Tortuga\",\n        \"zip\": \"75012\"         \n    },\n    \"tokens\": {\n        \"accessToken\": \"(string_jwt)\",\n        \"refresh()\": \"(random_string)\"\n    }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error400",
            "description": "<p>Email duplicate error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error404",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Email Already Taken\n{\n  \"error\": \"EmailDuplicateError\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "Put",
    "url": "/user",
    "title": "To update user informations",
    "name": "UpdatelUserInformation",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Unique. Used to retrieve users.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>All users and all user's datas (except status &amp; password).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 User successfulle updated\n{\n  \"user\": {\n      \"id\": \"(random_string)\",\n      \"firstname\": \"Jack\",\n      \"lastname\": \"Sparrow\",\n      \"email\": \"Jack.Sparrow@Captain.com\",\n      \"password\": \"(hashed_password)\"\n      \"phone\": \"06 23 45 67 89\"\n      \"adress\": {\n          \"numberAndStreet\": \"2 rue du gros bateau\",\n          \"city\": \"Tortuga\",\n          \"zip\": \"75012\"         \n      }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error400",
            "description": "<p>Bad input.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error500",
            "description": "<p>Internal server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad input\n{\n  \"error\": \"BadInput\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "Schema",
    "url": "User",
    "title": "Schema, stating users properties",
    "name": "UserSchema",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "FirstName",
            "description": "<p>Firstname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "LastName",
            "description": "<p>Lastname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": "<p>Password affiliated with a unique email adress, verified and crypted.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "Admin",
            "description": "<p>Access level of the user. The admin has no limit.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Phone",
            "description": "<p>User's telephonic contact. has to match a 10 digit phone number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Address",
            "description": "<p>User's home location. Asked to prevent irresponsable orders (if the client has to drive 200km to get 2 potatoes).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "NumberAndStreet",
            "description": "<p>Part of the user adress.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "City",
            "description": "<p>Used to locate the user. Jardin Cabellio sells locally only.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Zip",
            "description": "<p>User's postal code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RefreshToken",
            "description": "<p>Used to identify the user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/models/user.model.js",
    "groupTitle": "User"
  }
] });
