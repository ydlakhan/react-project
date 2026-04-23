import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 2, packed: true },
  { id: 4, description: "Mouse", quantity: 5, packed: true },
];
export default function () {
  const [items, setItems] = useState([]);

  function addNewItemsInList(items = []) {
    setItems((itemData) => [...itemData, items]);
  }

  function isDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function checkBoxChecked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id == id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form addNewItemsInList={addNewItemsInList} />
      <PackingList
        items={items}
        isDeleteItems={isDeleteItems}
        checkBoxChecked={checkBoxChecked}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 For Away 💼</h1>;
}

function Form({ addNewItemsInList }) {
  const [description, setDecription] = useState();
  const [quantity, setQuantity] = useState(1);
  function submitHandler(e) {
    e.preventDefault();
    if (!description) return;

    const itemList = {
      description: description,
      quantity: quantity,
      packed: false,
      id: Date.now(),
    };
    addNewItemsInList(itemList);
    setDecription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for you 😍 trip ?</h3>
      <select
        onChange={(e) => setQuantity(e.target.value)}
        value={Number(quantity)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDecription(e.target.value)}
      />
      <button type="submit">ADD</button>
    </form>
  );
}

function PackingList({ items, isDeleteItems, checkBoxChecked }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            isDeleteItems={isDeleteItems}
            checkBoxChecked={checkBoxChecked}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, isDeleteItems, checkBoxChecked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => checkBoxChecked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => isDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X item on your list, and you already packed x (X%)</em>
    </footer>
  );
}
