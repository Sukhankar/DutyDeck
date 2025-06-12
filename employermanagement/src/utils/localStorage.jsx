// src/data.js

const employees = [
  {
    id: 1,
    email: "employee1@example.com",
    password: "12345678",
    tasks: [/* tasks omitted for brevity */]
  },
  {
    id: 2,
    email: "employee2@example.com",
    password: "123",
    tasks: [/* tasks omitted */]
  },
  // add other employees...
];

const admin = [
  {
    id: 100,
    email: "admin@example.com",
    password: "12345678"
  }
];

export const setLocalStorage = () => {
  if (!localStorage.getItem("employees")) {
    localStorage.setItem("employees", JSON.stringify(employees));
  }
  if (!localStorage.getItem("admin")) {
    localStorage.setItem("admin", JSON.stringify(admin));
  }
};

export const getLocalStorage = () => {
  const employeesData = localStorage.getItem("employees");
  const adminData = localStorage.getItem("admin");

  return {
    employees: employeesData ? JSON.parse(employeesData) : [],
    admin: adminData ? JSON.parse(adminData) : []
  };
};
