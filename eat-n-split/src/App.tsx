import { useState } from "react";
import "./index.css";
import AddFriendForm from "./AddFriendForm";
import Button from "./Button";
import FriendList from "./FriendList";
import BillSplitSection from "./BillSplitSection";

type Friend = {
  id: number;
  name: string;
  image: string;
  balance: number;
};

const initialFriends: Friend[] = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState<typeof initialFriends>(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);

  function submitFriendHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;
    if (!name || !image) return;

    const newFriend = {
      id: Date.now(),
      name,
      image,
      balance: 0,
    };
    setFriends((friends) => [...friends, newFriend]);
    e.currentTarget.reset();
  }

  function submitBillHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const billValue = Number(formData.get("bill_value"));
    const yourExpense = Number(formData.get("your_expense"));
    const friendExpense = Number(formData.get("friend_expense"));
    const payer = formData.get("payer");

    if (!selectedFriend) return;
    if (billValue !== yourExpense + friendExpense) {
      alert("The sum of expenses must equal the bill value.");
      return;
    }

    setFriends((friends) =>
      friends.map((friend) => {
        if (friend.id === selectedFriend) {
          const delta =
            payer === "you"
              ? billValue - yourExpense
              : -(billValue - friendExpense);
          return { ...friend, balance: friend.balance + delta };
        }
        return friend;
      }),
    );

    e.currentTarget.reset();
    setSelectedFriend(null);
  }

  function openSplitBill(id: number) {
    setSelectedFriend(id);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          openSplitBill={openSplitBill}
          selectedFriend={selectedFriend}
        />
        {!showAddFriend && (
          <Button onClick={() => setShowAddFriend(true)}>Add Friend</Button>
        )}
        <AddFriendForm
          showAddFriend={showAddFriend}
          submitFriendHandler={submitFriendHandler}
          closeForm={() => setShowAddFriend(false)}
        />
      </div>

      <BillSplitSection
        selectedFriend={selectedFriend}
        friends={friends}
        submitBillHandler={submitBillHandler}
      />
    </div>
  );
}
