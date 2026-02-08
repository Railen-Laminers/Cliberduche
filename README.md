Create a dynamic sidebar and header in frontend that is in private folder
Next create the next component for admin
permission is last

I am building a **database management system** using:

- **Backend:** Laravel + Sanctum (API authentication)
- **Frontend:** React (Vite) + Tailwind CSS

The system requirements are:

1. **Authentication**
   - No public registration.
   - Only **Admin** can create/register users.
   - Login only for all users.
   - Use **Sanctum** for token-based authentication.

2. **User Roles & Permissions**
   - **Admin**
     - Full access to manage users, roles, departments, and permissions.
   - **Department Head / VP**
     - Approve requests, view department reports.
   - **HR Officer**
     - Manage employee files, hiring, benefits, memos.
   - **Finance Officer**
     - Bookkeeping, payroll, tax filing, financial reports.
   - **Procurement Staff**
     - Purchase orders, supplier coordination, material management.
   - **Safety/Warehouse Staff**
     - Inventory control, PPE distribution, safety inspections.
   - **Engineering Staff**
     - Project planning, QA/QC, project reports, timelines.

3. **Departments**
   - HR, Finance, Procurement, Safety/Warehouse, Engineering.
   - Users are assigned to **one department**.
   - Department heads supervise their department.

4. **Workflow / Permissions**
   - Staff report tasks to their department head.
   - Department head approves requests.
   - Admin oversees all departments and tasks.
   - Cross-department dependencies:
     - HR ↔ Finance (Payroll, benefits)
     - Procurement ↔ Finance (Payment approvals)
     - Engineering ↔ Procurement (Project materials)
     - Safety/Warehouse ↔ All (Safety & compliance)

5. **System Features**
   - Admin dashboard:
     - Manage users: create, update, deactivate accounts
     - Assign roles and departments
     - Assign permissions to roles
   - Department dashboards (Head):
     - Approve requests
     - View department reports
   - Staff dashboards:
     - View tasks assigned
     - Submit requests for approval
   - Authentication with **Sanctum** and token-based API access
   - Frontend uses **React + Tailwind CSS** for fast UI components.

6. **User Management Diagram**

                     	 +----------------+
                         |      Admin     |
                         | Full Access:   |
                         | Manage Users,  |
                         | Roles, Dept,   |
                         | Permissions    |
                         +----------------+
                                 |
    ----------------------------------------------------------------
    |               |               |              |              |
+-----------+  +---------------+ +-----------+ +------------+ +------------+
| HR        |  | Finance       | |Procurement| | Safety /   | | Engineering|
| Officer   |  | Officer       | |  Staff    | | Warehouse  | | Engineer   |
|-----------|  |---------------| |-----------| | Staff      | |----------- |
| - Employee|  | - Bookkeeping | | - Purchase| | - Inventory| | - Project  |
|   Files   |  | - Payroll     | |   Orders  | |   Control  | |   Planning |
| - Hiring  |  | - Tax Filing  | | - Supplier| | - PPE Dist | | - QA/QC    |
| - Benefits|  | - Financial   | |   Coord   | | - Safety   | | - Reports  |
| - Memos   |  |   Reports     | | - Material| |-Inspections| |  - Timeline|
+-----------+  +---------------+ +-----------+ +------------+ +------------+

                         +----------------+
                         | Department     |
                         | Head / VP      |
                         | - Approve      |
                         |   Requests     |
                         | - View Reports |
                         +----------------+






