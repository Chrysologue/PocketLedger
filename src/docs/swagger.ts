export const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Pocket Ledger API',
    version: '1.0.0',
    description: 'This is Rest API designed to provide user with helpful solution to handle money flow',
  },
  servers: [
    {
      url: 'http://localhost:8800',
      description: "Base url"
    },
  ],
  paths: {
    // Endpoints go here (e.g., /api/users, /api/categories, /api/transactions)
    "/api/users": {
        get: {
            description: "Get all users",
            security: [{myToken: []}],
            responses: {
                '200': {
                    description: "Success"
                },
                '401': {
                    description: "Unautorized - Invalid or expired token"
                },
                '403': {
                    description: "Forbidden"
                },
                '500':{
                    description: "Internal server error"
                }
            }
        },
        put: {
            description: "Update user profile",
            security: [{myToken: []}],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: "New user name (optional)"
                                },
                                password: {
                                    type: 'string',
                                    description: 'New user password (optional)'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: "Success - User updated"
                },
                '401': {
                    description: "Unauthorized"
                },
                '404': {
                    description: "No found"
                },
                '500': {
                    description: "Internal server error"
                }
            }
        },
        delete: {
            description: "Delete account",
            security: [{myToken: []}],
            responses: {
                '200': {
                    description: "Ok - account deleted"
                },
                '401': {
                    description: "Unauthorized"
                },
                '500': {
                    description: "Internal server error"
                }
            }
        }
    },
    '/api/users/register':{
        post: {
            description: "Register user",
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: "User name (required)"
                                },
                                email: {
                                    type: 'string',
                                    description: "User email (required)"
                                },
                                password: {
                                    type: 'string',
                                    description: "User password (required)"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: "Created - Registration successfull"
                },
                '400': {
                    description: "All fields are required"
                },
                '409': {
                    description: "Conflict - Email already exist"
                },
                '500': {
                    description: "Internal sever error"
                }
            }
        }
    },
    '/api/users/login': {
        post: {
            description: "Login user",
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    description: 'User email address (required)'
                                },
                                password: {
                                    type: 'string',
                                    description: 'User password (required)'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: "Success"
                },
                '400': {
                    description: "Bad request - All fields required"
                },
                '401': {
                    description: "Invalid email or password"
                },
                '500': {
                    description: "Internal server errror"
                }
            }
        }
    }
    
  },
  components: {
    securitySchemes: {
      myToken: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      // Data models (User, Category, Transaction)
    },
  },
};