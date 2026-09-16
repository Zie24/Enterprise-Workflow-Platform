# Enterprise Workflow Automation Platform

An enterprise workflow management platform for managing requests, approvals, tasks, teams, and notifications with role-based access control.

## 🎯 About the Project

**Enterprise Workflow Automation Platform** is a web-based system designed to organize and automate internal business workflows.

The platform helps employees submit requests, managers review and approve or reject them, and managers/admins create and assign tasks to employees. Employees can then track and update their assigned tasks from **To Do** to **In Progress** and finally **Completed**.

The goal of the project is to provide a centralized workspace that makes internal request and task management more organized, transparent, and efficient.

## ✨ Features

* **Landing Page** introducing the platform and its main capabilities.
* **Dashboard** with dynamic request statistics and recent activity.
* **Request Management**

  * Create requests.
  * View requests and their current status.
  * Approve or reject requests based on user role.
* **Task Management**

  * Managers and admins can create and assign tasks.
  * Tasks can be linked to an approved request or created independently.
  * Employees can view task details.
  * Employees can start tasks and mark them as completed.
* **Notifications** for important request activities.
* **Role-Based Access Control**

  * Employee
  * Manager
  * Admin
* **Authentication** using JWT.
* **Responsive UI** using Bootstrap and custom CSS.

## 🛠️ Tech Stack

### Frontend

* Angular
* TypeScript
* HTML5
* CSS3
* Bootstrap

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## 📸 Screenshots





### Dashboard



### Requests


### Creat Request


### Create Task / Assign Task



### Task Details


## 🚀 How to Run

### 1. Clone the repository


git clone https://github.com/your-username/Enterprise-Workflow-Platform.git
cd Enterprise-Workflow-Platform


### 2. Backend Setup

cd back_end
npm install



Run the backend:

npm run dev


The backend will run on:

http://localhost:3000


### 3. Frontend Setup

Open another terminal:

cd front_end
npm install
ng serve -open

The frontend will run on:
http://localhost:4200



## 🔐 User Roles

| Role     | Capabilities                                                      |
| -------- | ----------------------------------------------------------------- |
| Employee | Create requests, view assigned tasks, start tasks, complete tasks |
| Manager  | Review requests, approve/reject requests, create and assign tasks |
| Admin    | Manage tasks and access administrative workflow features          |


## 🔮 Future Improvements

* Advanced analytics and workflow reports
* Audit logs
* Email notifications
* File attachments
* Advanced search and filtering
* AI-powered workflow insights
* Subscription and payment features
