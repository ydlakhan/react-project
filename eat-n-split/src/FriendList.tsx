import  initialFriends  from "./App";
import  Friend  from "./Friend";

export default function FriendList({
  friends, openSplitBill, selectedFriend
}: {
  readonly friends: typeof initialFriends;
  readonly openSplitBill?: (id: number) => void;
  readonly selectedFriend: number | null;
}) {
  return (
    <ul>
      {friends.map((friend: typeof initialFriends[number]) => (
        <Friend
          key={friend.id}
          friend={friend}
          openSplitBill={openSplitBill}
          isSelected={friend.id === selectedFriend}
        />
      ))}
    </ul>
  );
}
