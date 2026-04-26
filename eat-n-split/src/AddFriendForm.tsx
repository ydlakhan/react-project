import  Button  from "./Button";

export default function AddFriendForm({
  showAddFriend, submitFriendHandler, closeForm,
}: {
  showAddFriend: boolean;
  submitFriendHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  closeForm: () => void;
}) {
  return (
    showAddFriend && (
      <div className="form">
        <form className="form-add-friend" onSubmit={submitFriendHandler}>
          <label className="label">👩‍🦰 Friend Name</label>
          <input type="text" name="name" />
          <label>🖼️ Image URL</label>
          <input type="text" name="image" />
          <Button type="submit">Add</Button>
          <Button type="button" onClick={closeForm}>
            Close
          </Button>
        </form>
      </div>
    )
  );
}
