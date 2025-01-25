import express from 'express';
import { findAll, create, findById, update, deleteEmployee } from '../controllers/employee.controller';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: API to manage Employees information
 */

 /**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Get all Employees
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: first_name
 *         schema:
 *           type: string
 *         description: Filter by employee name (partial match)
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by employee email (partial match)
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Filter by employee phone (partial match)
 *       - in: query
 *         name: organization
 *         schema:
 *           type: string
 *         description: Filter by employee organization (partial match)
 *       - in: query
 *         name: salary
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter by exact salary (e.g., 50000.00)
 *       - in: query
 *         name: status
 *         schema:
 *           type: number
 *         description: Filter by employee status (e.g., 0, 1)
 *       - in: query
 *         name: designation
 *         schema:
 *           type: string
 *         description: Filter by employee designation (partial match)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Column to sort by (e.g., name, salary)
 *       - in: query
 *         name: desc
 *         schema:
 *           type: boolean
 *         description: Whether to sort in descending order. Defaults to false
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records to return (pagination)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of records to skip (pagination)
 *     responses:
 *       "200":
 *         description: The list of all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employees'
 *       "404":
 *         $ref: '#/components/responses/404'
 *       "500":
 *         $ref: '#/components/responses/500'
 */

 router.get('/', findAll);

 /** 
 * @swagger
 *   /api/v1/employees:
 *     post:
 *       summary: Create a new employee
 *       tags: [Employees]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *       responses:
 *         "404":
 *           $ref: '#/components/responses/404'
 *         "500":
 *           $ref: '#/components/responses/500'
 *         "201":
 *           description: Employee created successfully
 *           contents:
 *             application/json
 */
 router.post('/', create);
 
 /** 
 * @swagger
 *   /api/v1/employees/{id}:
 *     get:
 *       summary: Get a specific employee by ID
 *       tags: [Employees]
 *       description: Retrieve details of a specific employee by their ID.
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the employee to get the detail
 *       responses:
 *         "200":
 *           description: The list of a particular Employee
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Employees'
 *         "404":
 *           $ref: '#/components/responses/404'
 *         "500":
 *           $ref: '#/components/responses/500'
 */
 router.get('/:id', findById);
 /** 
 * @swagger
 *   /api/v1/employees/{id}:
 *     put:
 *       summary: update a specific employee data by its ID
 *       tags: [Employees]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the employee to get the detail
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *               required:
 *       responses:
 *         "404":
 *           $ref: '#/components/responses/404'
 *         "500":
 *           $ref: '#/components/responses/500'
 *         "204":
 *           description: Employee updated successfully
 *           contents:
 *             application/json
 */
 router.put('/:id', update);

 /** 
 * @swagger
 *   /api/v1/employees/{id}:
 *     delete:
 *       summary: Delete the specific employee detail
 *       tags: [Employees]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *           required: true
 *           description: Id of the employee
 *       responses:
 *         "404":
 *           $ref: '#/components/responses/404'
 *         "500":
 *           $ref: '#/components/responses/500'
 *         "204":
 *           description: Employee deleted successfully
 *           contents:
 *             application/json
 */
 router.delete('/:id', deleteEmployee);

 export default router; // Default export
