import dbConn from '../../config/db.config';

// Define the Employee interface
interface EmployeeData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  salary: number;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
  limit?: number;
  offset?: number;
}

// Define the Employee class
class Employee {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  salary: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  limit?: number;
  offset?: number;

  constructor(employee: EmployeeData) {
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
    this.phone = employee.phone;
    this.organization = employee.organization;
    this.designation = employee.designation;
    this.salary = employee.salary;
    this.status = employee.status ? employee.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.limit = employee.limit;
    this.offset = employee.offset;
  }

  // Create an employee
  static async create(newEmp: EmployeeData): Promise<any> {
    try {
      const connection = await dbConn; // Await the resolved connection
      const query = "INSERT INTO db_gst.employees (first_name, last_name, email, phone, organization, designation, salary, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [
        newEmp.first_name,
        newEmp.last_name,
        newEmp.email,
        newEmp.phone,
        newEmp.organization,
        newEmp.designation,
        newEmp.salary,
        newEmp.status || 1, // Default status to 1 if not provided
        new Date(), // created_at
        new Date(), // updated_at
      ];

      const [result] = await connection.execute(query, values); // Execute query with promise
      console.log(result);
      // `result` will be of type ResultSetHeader, which contains `insertId`
      return null; // Return insertId if it exists
    } catch (err) {
      console.error("Error: ", err);
      throw err;
    }
  }

  // Find employee by ID
  static async findById(id: number): Promise<any> {
    try {
      const connection = await dbConn;
      const [rows] = await connection.execute(
        "SELECT * FROM db_gst.employees WHERE id = ?",
        [id]
      );
      return rows;
    } catch (err) {
      console.error("Error: ", err);
      throw err;
    }
  }

  static async findAll(
    filters: {
      first_name?: string;
      email?: string;
      phone?: string;
      organization?: string;
      salary?: number;
      status?: number;
      designation?: string;
      sortBy?: string;
      desc?: boolean;
      limit?: number;
      offset?: number;
    }
  ): Promise<any> {
    try {
      const connection = await dbConn;
  
      // Base query
      let query = "SELECT * FROM db_gst.employees";
      const queryParams: any[] = [];
  
      // Add filters dynamically
      const conditions: string[] = [];
      if (filters.first_name) {
        conditions.push("first_name LIKE ?");
        queryParams.push(`%${filters.first_name}%`);
      }
      if (filters.email) {
        conditions.push("email LIKE ?");
        queryParams.push(`%${filters.email}%`);
      }
      if (filters.phone) {
        conditions.push("phone LIKE ?");
        queryParams.push(`%${filters.phone}%`);
      }
      if (filters.organization) {
        conditions.push("organization LIKE ?");
        queryParams.push(`%${filters.organization}%`);
      }
      if (filters.salary) {
        conditions.push("salary = ?");
        queryParams.push(filters.salary);
      }
      if (filters.status) {
        conditions.push("status = ?");
        queryParams.push(filters.status);
      }
      if (filters.designation) {
        conditions.push("designation LIKE ?");
        queryParams.push(`%${filters.designation}%`);
      }
  
      // Add conditions to query if they exist
      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }
  
      // Add sorting
      if (filters.sortBy) {
        query += ` ORDER BY ${filters.sortBy}`;
        if (filters.desc) {
          query += " DESC";
        } else {
          query += " ASC";
        }
      }
  
      // Add limit
      if (filters.limit) {
        // query += " LIMIT ?";
        // queryParams.push(filters.limit);
        query += ` LIMIT ${filters.limit}`;
      }

      // Add offest
      if (filters.offset) {
        // query += " OFFSET ?";
        // queryParams.push(filters.offset);
        query += ` OFFSET ${filters.offset}`;
      }
  
      console.log("Filtered Employees: ", filters);
      // Execute query
      const [rows] = await connection.execute(query, queryParams);
      console.log("Filtered Employees: ", rows);
      return rows;
    } catch (err) {
      console.error("Error: ", err);
      throw err;
    }
  }
  

  // Update an employee by ID
  static async update(id: number, employee: EmployeeData): Promise<any> {
    try {
      const connection = await dbConn;
      const [result] = await connection.execute(
        `UPDATE db_gst.employees SET first_name=?, last_name=?, email=?, phone=?, organization=?, designation=?, salary=? WHERE id = ?`,
        [
          employee.first_name,
          employee.last_name,
          employee.email,
          employee.phone,
          employee.organization,
          employee.designation,
          employee.salary,
          id,
        ]
      );
      return result;
    } catch (err) {
      console.error("Error: ", err);
      throw err;
    }
  }

  // Delete an employee by ID
  static async delete(id: number): Promise<any> {
    try {
      const connection = await dbConn;

      // Check if the employee exists
      const [rows]: any = await connection.execute(
        "SELECT id FROM db_gst.employees WHERE id = ?",
        [id]
      );

      if (rows.length === 0) {
        // If no employee found, return 404
        return {
          status: 404,
          message: "Employee not found",
        };
      }

      // Delete the employee
      try {
        const [result]: any = await connection.execute(
          "DELETE FROM db_gst.employees WHERE id = ?",
          [id]
        );

        // Check if the delete operation affected any rows
        if (result.affectedRows > 0) {
          return {
            status: 200, // Success, no content
            message: "Employee successfully deleted",
          };
        } else {
          return {
            status: 404,
            message: "Employee not found or already deleted",
          };
        }
      } catch (err) {
        console.error("Error during deletion: ", err);
        return {
          status: 500,
          message: "Internal server error",
          error: err,
        };
      }
    } catch (err) {
      console.error("Database connection error: ", err);
      return {
        status: 500,
        message: "Database connection error",
        error: err,
      };
    }
  }

}

export default Employee;
