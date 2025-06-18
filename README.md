📝 Task Management System
A full-stack task management platform for administrators and employees to track, manage, and collaborate on assigned tasks with real-time user-specific status updates, insights, and deadline-based validations.

🚀 Features
👨‍💼 Admin Capabilities
Create and assign tasks to one or more employees

Set deadlines for each task

View all tasks with color-coded status badges

Monitor task progress (Pending, In Progress, Completed, Failed)

Delete or update existing tasks

Add and manage task-related queries (comments)

Visualize user-specific task insights with filtering by status

View overall task stats (new, completed, in progress, pending)

👷‍♀️ Employee Capabilities
Login and view only assigned tasks

Update personal task status (e.g. mark as In Progress or Completed)

View task queries or raise queries

Track if a task has passed its deadline

Automatically marked as “Failed” if the deadline is missed without completion

View own task breakdowns per status

🛠️ Tech Stack
Frontend
React.js

Tailwind CSS

Axios for API calls

React Router DOM

Backend
Node.js

Express.js

MongoDB (Mongoose for schema modeling)

JWT-based Authentication

📂 Project Structure
bash
Copy
Edit
/client
  /components
    /TaskCard.jsx
    /TaskModal.jsx
    /CreateTask.jsx
    /UserInsights.jsx
    /TaskNumber.jsx
  /pages
    /Dashboard.jsx
    /Login.jsx
    /UserTasks.jsx
  App.jsx

/server
  /models
    /Task.js
    /User.js
  /routes
    /tasks.js
    /users.js
  /controllers
    /taskController.js
  index.js
📊 User Insights & Filtering
Each user’s assigned tasks are tracked individually with their own status field. Admins can:

Click on Completed, In Progress, Seen, or Failed counts from the User Insights table.

See detailed filtered tasks for that user and status.

🧠 Smart Features
Deadline Enforcement: Any task not marked as completed before the deadline is automatically set to Failed.

Individual Status Tracking: Even if multiple users are assigned the same task, their progress is tracked independently.

Real-time UI Sync: Task stats and insights auto-refresh when updates happen.

🧪 Installation
bash
Copy
Edit
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
Backend
bash
Copy
Edit
cd server
npm install
npm run dev
Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
🔐 Authentication
Role-based access (admin vs employee)

JWT stored securely in localStorage

Authenticated APIs protected using middleware

✅ Future Improvements
Email/SMS notifications on task assignment or deadline alerts

File attachments with tasks

Admin analytics dashboard

Export task reports to CSV/PDF

📄 License
This project is open-source under the MIT License.

