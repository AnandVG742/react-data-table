import DataTable from "./DataTable";

const data = [
  { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 22, email: "charlie@example.com" },
];

const columns = [
  { label: "ID", accessor: "id" },
  { label: "Name", accessor: "name" },
  { label: "Age", accessor: "age" },
  { label: "Email", accessor: "email" },
];

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default App;
