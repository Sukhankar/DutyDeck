# 📝 Task Management System

A full-stack task management platform for administrators and employees to **track**, **manage**, and **collaborate** on assigned tasks with real-time user-specific status updates, insights, and automatic deadline-based validations.

---

## 🚀 Features

### 👨‍💼 Admin Capabilities
- Create and assign tasks to one or more employees
- Set deadlines for each task
- View all tasks with color-coded status badges
- Monitor task progress (`Pending`, `In Progress`, `Completed`, `Failed`)
- Delete or update existing tasks
- Add and manage task-related queries (comments)
- Visualize user-specific task insights with filtering by status
- View overall task stats (new, completed, in progress, pending)

### 👷‍♀️ Employee Capabilities
- Login and view only assigned tasks
- Update personal task status (`In Progress`, `Completed`)
- View task queries or raise new ones
- Tasks automatically marked as `Failed` if deadline passes without completion
- View own task breakdowns by status (Completed, Pending, etc.)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT-based Authentication

---

## 📊 User Insights & Filtering

- Each user’s task is tracked **independently** with their own status (`Pending`, `In Progress`, `Completed`, `Failed`)
- Admin can click on a user’s:
  - `Completed`, `In Progress`, `Failed`, or `Seen` stats
  - And view all tasks for that user filtered by the selected status

---

## 🧠 Smart Features

- **⏰ Deadline Enforcement:** Automatically marks tasks as `Failed` if the deadline is missed
- **👥 Individual User Status:** Users assigned to the same task can have different progress statuses
- **🔁 Real-time UI Sync:** Stats, insights, and lists update dynamically on task changes

---

## 🧪 Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
````

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Authentication

* Role-based access: `admin` vs `employee`
* JWT securely stored in localStorage
* All API endpoints protected by middleware

---

## ✅ Future Improvements

* Email/SMS notifications on task assignment or approaching deadline
* File attachments with tasks
* Analytics dashboard for admin
* Export task reports as CSV or PDF

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Made with ❤️ by Subhan and sukhankar (https://github.com/SubhanKhalif)
