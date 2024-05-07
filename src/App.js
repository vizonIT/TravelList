import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form() {
  // creating a controlled state
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    // prevent the default form reload on submission
    e.preventDefault();

    // prevent submission where the decsription field is empty
    if (!description) return;

    // crerate new item on submit!
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    // update the state of the input fields to it initial state after submit
    setDescription("");
    setQuantity("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😊 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

const Item = ({ pkgItem }) => {
  return (
    <li>
      <input type="checkbox" />
      <span style={pkgItem.packed ? { textDecoration: "line-through" } : {}}>
        {pkgItem.quantity} {pkgItem.description}
      </span>
      <button>❌</button>
    </li>
  );
};

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item pkgItem={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
