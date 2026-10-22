export const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Pocket Ledger API',
    version: '1.0.0',
    description:
      'This is Rest API designed to provide user with helpful solution to handle money flow',
  },
  servers: [
    {
      url: 'http://localhost:8800',
      description: 'Base url',
    },
  ],
  paths: {
    // Endpoints go here (e.g., /api/users, /api/categories, /api/transactions)
    '/api/users': {
      get: {
        tags: ['Users'],
        description: 'Get all users',
        security: [{ myToken: [] }],
        responses: {
          '200': {
            description: 'Success',
          },
          '401': {
            description: 'Unautorized - Invalid or expired token',
          },
          '403': {
            description: 'Forbidden',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
      put: {
        tags: ['Users'],
        description: 'Update user profile',
        security: [{ myToken: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'New user name (optional)',
                  },
                  password: {
                    type: 'string',
                    description: 'New user password (optional)',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success - User updated',
          },
          '401': {
            description: 'Unauthorized',
          },
          '404': {
            description: 'No found',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
      delete: {
        tags: ['Users'],
        description: 'Delete account',
        security: [{ myToken: [] }],
        responses: {
          '200': {
            description: 'Ok - account deleted',
          },
          '401': {
            description: 'Unauthorized',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
    },
    '/api/users/register': {
      post: {
        tags: ['Users'],
        description: 'Register user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'User name (required)',
                  },
                  email: {
                    type: 'string',
                    description: 'User email (required)',
                  },
                  password: {
                    type: 'string',
                    description: 'User password (required)',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created - Registration successfull',
          },
          '400': {
            description: 'All fields are required',
          },
          '409': {
            description: 'Conflict - Email already exist',
          },
          '500': {
            description: 'Internal sever error',
          },
        },
      },
    },
    '/api/users/login': {
      post: {
        tags: ['Users'],
        description: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    description: 'User email address (required)',
                  },
                  password: {
                    type: 'string',
                    description: 'User password (required)',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
          },
          '400': {
            description: 'Bad request - All fields required',
          },
          '401': {
            description: 'Invalid email or password',
          },
          '500': {
            description: 'Internal server errror',
          },
        },
      },
    },
    //Categories
    '/api/categories': {
      post: {
        tags: ['Categories'],
        description: 'Create a category',
        security: [{ myToken: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'string',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Name of category (required)',
                  },
                  type: {
                    type: 'string',
                    description: 'Type of category',
                  },
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Categories'],
        description: 'Get all categories',
        security: [{ myToken: [] }],
        parameters: [
          {
            name: 'type',
            in: 'query',
            required: false,
            description: 'Filter category by type',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
          },
          '401': {
            description: 'Unauthorized',
          },
          '403': {
            description: 'Forbidden',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
    },
    '/api/categories/{id}': {
      get: {
        tags: ['Categories'],
        description: 'Get category by ID',
        security: [{ myToken: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
          },
          '404': {
            description: 'Not found',
          },
          '401': {
            description: 'Unauthorized',
          },
          '400': {
            description: 'Invalid category ID',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
      put: {
        tags: ['Categories'],
        description: 'Update category',
        security: [{ myToken: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Name of category (optional)',
                  },
                  type: {
                    type: 'string',
                    description: 'Type of category',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
          },
          '404': {
            description: 'Not found',
          },
          '401': {
            description: 'Unauthorized',
          },
          '400': {
            description: 'Invalid category ID',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
      delete: {
        tags: ['Categories'],
        description: 'Delete category',
        security: [{ myToken: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
          },
          '404': {
            description: 'Not found',
          },
          '401': {
            description: 'Unauthorized',
          },
          '400': {
            description: 'Invalid category ID',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
    },
    //Transactions
    '/api/transactions': {
      get: {
        tags: ['Transactions'],
        description: 'Get all transaction',
        security: [{ myToken: [] }],
        parameters: [
          {
            name: 'type',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
          },
          '401': {
            description: 'Unauthorized',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
      post: {
        tags: ['Transactions'],
        description: 'Create transaction',
        security: [{ myToken: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  amount: {
                    type: 'number',
                    description: 'Transaction amount (required)',
                  },
                  description: {
                    type: 'string',
                    description: 'Transaction description (required)',
                  },
                  date: {
                    type: 'Date',
                    description: 'Transaction Date (required)',
                  },
                  type: {
                    type: 'string',
                    description: 'Transaction type (required)',
                  },
                  category: {
                    type: 'string',
                    description: 'Category ID (required)',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created',
          },
          '401': {
            description: 'Unauthorized',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
    },
    '/api/transactions/{id}': {
      get: {
        tags: ['Transactions'],
        description: 'Get transaction by ID',
        security: [{ myToken: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
          },
          '401': {
            description: 'Unauthorized',
          },
          '404': {
            description: 'Not found',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
      put: {
        tags: ['Transactions'],
        description: 'Update transaction',
        security: [{ myToken: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  amount: {
                    type: 'number',
                    description: 'Transaction amount (optional)',
                  },
                  description: {
                    type: 'string',
                    description: 'Transaction description (optional)',
                  },
                  date: {
                    type: 'Date',
                    description: 'Transaction Date (optional)',
                  },
                  type: {
                    type: 'string',
                    description: 'Transaction type (optional)',
                  },
                  category: {
                    type: 'string',
                    description: 'Category ID (optional)',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Success',
          },
          '401': {
            description: 'Unauthorized',
          },
          '404': {
            description: 'Not found',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
      delete: {
        tags: ['Transactions'],
        description: 'Delete transaction',
        security: [{ myToken: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Success',
          },
          '401': {
            description: 'Unauthorized',
          },
          '404': {
            description: 'Not found',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      myToken: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      // Data models (User, Category, Transaction)
    },
  },
};
