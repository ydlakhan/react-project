import type  initialFriends from "./App";
import Button from "./Button";


export default function Friend({
  friend, openSplitBill,isSelected
}: {
  friend: (typeof initialFriends)[0];
  openSplitBill?: (id: number) => void;
  isSelected: boolean;
}) {
  const friendBalanceClass = friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : "gray";
  return (
    <li key={friend.id}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p className={friendBalanceClass}>
        {friend.balance > 0
          ? `${friend.name} owes you $${friend.balance}`
          : `You owe ${friend.name} $${Math.abs(friend.balance)}`}
      </p>
      <Button onClick={() => openSplitBill?.(friend.id)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
}
