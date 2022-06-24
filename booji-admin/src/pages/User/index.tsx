import { useDelUser, useUserList } from "@/hooks/user";
import { UserData } from "@/types";
import { useState } from "react";
import DelUser from "./DelUser";
import UserList from "./UserList";

const User = () => {
  const { value, loading, setPage, retry } = useUserList();
  const { visible, onOpen, onClose } = useDelUser();

  const [curUser, setCurUser] = useState<UserData>();

  const onDelete = (user: UserData) => {
    setCurUser(user);
    onOpen();
  };

  return (
    <>
      <UserList
        value={value}
        loading={loading}
        onDelete={onDelete}
        onChange={setPage}
      />
      {curUser && (
        <DelUser
          user={curUser}
          visible={visible}
          onClose={onClose}
          onSuccess={retry}
        />
      )}
    </>
  );
};

export default User;
