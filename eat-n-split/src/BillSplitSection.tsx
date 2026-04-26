import { useState, useEffect } from "react";
import initialFriends from "./App";
import Button from "./Button";

export default function BillSplitSection({
  selectedFriend, friends, submitBillHandler,
}: {
  selectedFriend: number | null;
  friends: typeof initialFriends;
  submitBillHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const friend = friends.find((f) => f.id === selectedFriend);
  const [billValue, setBillValue] = useState<number|null>(null);
  const [yourExpense, setYourExpense] = useState<number|null>(null);
  const friendExpense = billValue !== null && yourExpense !== null ? billValue - yourExpense : null;

  useEffect(() => {
    setBillValue(null);
    setYourExpense(null);
  }, [selectedFriend]);

  return (
    selectedFriend !== null && (
      <div className="form-split-bill">
        <div className="form">
          <form className="form-add-friend" onSubmit={submitBillHandler}>
            <label className="label">💰 Bill Value</label>
            <input type="number" name="bill_value" value={billValue ?? ""} onChange={(e) => setBillValue(Number(e.target.value))} />

            <label>👤 Your Expense</label>
            <input type="number" name="your_expense" value={yourExpense ?? ""} onChange={(e) => setYourExpense(Number(e.target.value) > billValue ? billValue : Number(e.target.value))} />

            <label>👥 {friend ? `${friend.name}'s Expense` : "Friend's Expense"}</label>
            <input type="number" name="friend_expense" value={friendExpense ?? ""} readOnly />

            <label>🧍‍♂️ Who is paying the bill?</label>
            <select name="payer" id="payer">
              <option value="you">You</option>
              <option value="friend">{friend ? friend.name : "Friend"}</option>
            </select>

            <Button type="submit">Split Bill</Button>
          </form>
        </div>
      </div>
    )
  );
}
