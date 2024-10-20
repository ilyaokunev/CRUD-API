import userController from "./controllers/userController.js"

export default {
  '/api/users': {
    'GET': userController.getAllUsers,
    'POST': () =>null
  },
  '/api/users/:id': {
    'GET': userController.getUser,
    'PUT': () => null,
    'DELETE': () => null
  }
}

