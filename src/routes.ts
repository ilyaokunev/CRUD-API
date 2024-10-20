import { IRouter } from "interfaces/router.js"
import userController from "./controllers/userController.js"

export default {
  '/api/users': {
    'GET': userController.getAllUsers,
    'POST': userController.createUser
  },
  '/api/users/:id': {
    'GET': userController.getUser,
    'PUT': userController.updateUser,
    'DELETE': userController.deleteUser,
  }
} as unknown as IRouter

