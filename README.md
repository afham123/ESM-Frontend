# Enterprise Supplier Management App-Frontend

The **Enterprise Supplier Management** web application enables enterprises to securely store, manage, and organize supplier data in the cloud. Users can apply filters, perform both simple and advanced searches, and easily add, update, or delete records as needed. The application includes a secure login system with session-based access that expires after 24 hours, ensuring data safety and access control. With the help of GQL APIs, administrators can retrieve only the data they require from the server, thereby optimizing network bandwidth and enhancing overall performance.

![image](https://github.com/user-attachments/assets/6bd61ed0-6e7a-47ef-be05-eacbcc3c4b03)


* The frontend is built with **ReactJS** to create an interactive user interface. We use **Bootstrap** for styling, including modals, and **Material UI (MUI)** for a suite of customizable UI components such as pagination, tables, paper, menus, and buttons, which streamline the interface.

* The application leverages React hooks, including **useState**, **useEffect**, **useNavigate**, **useQuery**, and **useMutation**, to manage component state, side effects, and routing.

* For API interactions, we use **Apollo Client** for GraphQL queries and mutations and **Axios** for REST API requests to the server.
