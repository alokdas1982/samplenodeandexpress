import { Request, Response } from 'express';
import Employee from '../models/employee.model';

export const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract query parameters from the request
    const {
      first_name,
      email,
      phone,
      organization,
      salary,
      status,
      designation,
      sortBy,
      desc,
      limit,
      offset,
    } = req.query;

    // Convert numerical and boolean query parameters
    const filters = {
      first_name: first_name as string,
      email: email as string,
      phone: phone as string,
      organization: organization as string,
      salary: salary ? Number(salary) : undefined,
      status: status ? Number(status) : undefined,
      designation: designation as string,
      sortBy: sortBy as string,
      desc: desc === "true", // Convert to boolean
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    };

    // Fetch filtered employees from the model
    const employees = await Employee.findAll(filters);

    // Respond with the data
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error retrieving employees:", err);
    res.status(500).send({ error: true, message: "Error retrieving employees" });
  }
};

// Create a new employee
export const create = async (req: Request, res: Response): Promise<void> => {
  const newEmployee = new Employee(req.body);

  // Validate request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required fields' });
    return;
  }

  try {
    const employeeId = await Employee.create(newEmployee);
    res.status(201).json({
      error: false,
      message: 'Employee added successfully!',
      data: employeeId,
    });
  } catch (err) {
    res.status(500).send({ error: true, message: 'Error creating employee' });
  }
};

// Find employee by ID
export const findById = async (req: Request, res: Response): Promise<void> => {
  const employeeId = parseInt(req.params.id, 10);

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee || employee.length === 0) {
      res.status(404).send({ error: true, message: 'Employee not found' });
    } else {
      res.status(200).json(employee);
    }
  } catch (err) {
    res.status(500).send({ error: true, message: 'Error retrieving employee' });
  }
};

// Update an employee
export const update = async (req: Request, res: Response): Promise<void> => {
  const employeeId = parseInt(req.params.id, 10);

  // Validate request
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required fields' });
    return;
  }

  const updatedEmployee = new Employee(req.body);

  try {
    await Employee.update(employeeId, updatedEmployee);
    res.status(200).json({ error: false, message: 'Employee updated successfully!' });
  } catch (err) {
    res.status(500).send({ error: true, message: 'Error updating employee' });
  }
};

// Delete an employee
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  const employeeId = parseInt(req.params.id, 10);

  try {
    const result = await Employee.delete(employeeId);

    if (result.status === 404) {
      res.status(404).json({ error: true, message: 'Employee not found' });
    } else if (result.status === 500) {
      res.status(500).json({ error: true, message: 'Internal server error', details: result.error });
    } else if (result.status === 204) {
      res.status(204).send(); // No content
    } else {
      res.status(200).json({ error: false, message: 'Employee data deleted successfully!' });
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: true, message: 'Unexpected server error' });
  }
};
