import { useAtom } from "jotai";
import { addNewUser, editThisUser, modalOpen, open, searchBy, selected, Users } from "../atoms/atoms";
import {
  Button,
  Divider,
  Drawer,
  Image,
  Input,
  Modal,
  Segmented,
  Select,
  Typography,
} from "antd";
import {
  ClockCircleOutlined,
  LockOutlined,
  MoonOutlined,
  PhoneOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import Search from "antd/es/transfer/search";
import { useState } from "react";

export default function TableUser() {
  const [users, setUsers] = useAtom(Users);
  const [Open, setOpen] = useAtom(open);
  const [selectedUser, setSelectedUser] = useAtom(selected);
  const [editUser, setEditUser]= useAtom(editThisUser)

  //MODAL
  const [isModalOpen, setIsModalOpen] = useAtom(modalOpen);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalEdit = (user)=>{
    setEditUser(user)
    setIsModalOpen(true)
  }

  const handleOk = (state, newUser) => {
    if (editUser.id) {
      edit(newUser); // Если есть ID, значит редактируем
    } else {
      add(newUser); // Если нет ID, значит добавляем нового
    }
    setIsModalOpen(state);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = (state, user) => {
    setOpen(state);
    setSelectedUser(user);
  };
  const onClose = () => {
    setOpen(false);
  };

  //CHEK
  function chek(id) {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
  }


  //Theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const changeTheme = (value) => {
    setTheme(value);
    localStorage.setItem("theme", value);
     
    if (value === "dark") {
      document.body.style.backgroundColor = "#1e1e1e";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  //SORT BY STATUS
  const [originalUsers, setOriginalUsers] = useState(users);

  function sortByStatus(status) {
    if (status === "") {
      setUsers(originalUsers);
    } else {
      setUsers(
        originalUsers.filter((user) => user.status.toString() === status)
      );
    }
  }
  function sortByCity(status) {
    if (status === "") {
      setUsers(originalUsers);
    } else {
      setUsers(
        originalUsers.filter((user) => user.city === status)
      );
    }
  }

  //DELETE
  function deleteUser(id) {
    setUsers(users.filter((user) => user.id != id));
  }

  //ADD
  const [addUser, setAddUser] = useAtom(addNewUser);
  function add(newUser) {
    setUsers([...users, newUser]);
  }

  //EDIT
  function edit(EditingUser) {
    setUsers(
      users.map((user) =>
        user.id === EditingUser.id ? { ...EditingUser } : user
      )
    );
  }


  //SEARCH
  const [search,setSearch]= useAtom(searchBy)

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        // padding: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "5vh 0vh",
        }}
      >
        <Typography
          style={{
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          User List
        </Typography>
        <div
          style={{
            display: "flex",
            gap: "5vh",
          }}
        >
          <Button onClick={showModal} color="blue" variant="solid">
            +NEW
          </Button>
          <Segmented
      shape="round"
      options={[
        { value: "light", icon: <SunOutlined /> },
        { value: "dark", icon: <MoonOutlined /> },
      ]}
      value={theme}
      onChange={changeTheme}
    />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "50%",
          margin: "5vh 0",
        }}
      >
        <div style={{ display: "flex" }}>
          <Select
            style={{
              width: "25vh",
            }}
            placeholder="Sort by status"
            onChange={(value) => sortByStatus(value)}
          >
            <Select.Option value="">All Status</Select.Option>
            <Select.Option value="true">Active</Select.Option>
            <Select.Option value="false">Inactive</Select.Option>
          </Select>
          <Select
            style={{
              width: "25vh",
            }}
            placeholder="Sort by city"
            onChange={(value) => sortByCity(value)}
          >
            <Select.Option value="">All Cities</Select.Option>
            <Select.Option value="Dushanbe">Dushanbe</Select.Option>
            <Select.Option value="Khujand">Khujand</Select.Option>
            <Select.Option value="California">California</Select.Option>
            <Select.Option value="Bokhtar">Bokhtar</Select.Option>
          </Select>
        </div>
        <Search onChange={(e)=>setSearch(e.target.value)} placeholder="input search text" />
      </div>
      <table
        style={{ borderCollapse: "collapse", width: "100%", margin: "auto" }}
      >
        <thead
          style={{ backgroundColor: "#F8F9FD", borderCollapse: "collapse" }}
        >
          <tr>
            <th style={{ padding: "2vh", textAlign: "start" }}>
              <UserOutlined /> Name
            </th>
            <th style={{ padding: "2vh", textAlign: "start" }}>
              <LockOutlined />
              City
            </th>
            <th style={{ padding: "2vh", textAlign: "start" }}>
              <ClockCircleOutlined />
              Status
            </th>
            <th style={{ padding: "2vh", textAlign: "start" }}>
              <PhoneOutlined />
              Phone
            </th>
            <th style={{ padding: "2vh", textAlign: "start" }}>
              <SettingOutlined /> Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.filter((user) =>user.name.includes(search))
          .map((user) => {
            return (
              <tr key={user.id}>
                <td
                  style={{
                    padding: "2vh",
                    borderBottom: "1px solid lightgrey",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Image src={user.avatar.user} width={"10%"} />
                    <div>
                      <Typography style={{}}>
                        {user.name} {user.suranme}
                      </Typography>
                      <Typography>{user.email}</Typography>
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    padding: "2vh",
                    borderBottom: "1px solid lightgrey",
                  }}
                >
                  <Typography>{user.city}</Typography>
                </td>
                <td
                  style={{
                    padding: "2vh",
                    borderBottom: "1px solid lightgrey",
                  }}
                >
                  <Button
                    variant="solid"
                    color={user.status ? "green" : "danger"}
                    onClick={() => chek(user.id)}
                  >
                    {user.status ? "ACTIVE" : "INACTIVE"}
                  </Button>
                </td>
                <td
                  style={{
                    padding: "2vh",
                    borderBottom: "1px solid lightgrey",
                  }}
                >
                  <Typography>{user.phone}</Typography>
                </td>
                <td
                  style={{
                    padding: "2vh",
                    borderBottom: "1px solid lightgrey",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Button
                      variant="solid"
                      color="danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Del
                    </Button>
                    <Button onClick={()=>showModalEdit(user)} variant="solid" color="green">
                      Edit
                    </Button>
                    <Button
                      onClick={() => showDrawer(true, user)}
                      variant="solid"
                      color="pink"
                    >
                      Info
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/*Modal Info*/}
      <Drawer title="User Info" onClose={onClose} open={Open}>
        <div
          style={{
            margin: "auto",
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Image src={selectedUser && selectedUser.avatar?.user} />
          <Typography>
            {selectedUser && selectedUser.name}
            {selectedUser && selectedUser.suranme}
          </Typography>
          <Typography>{selectedUser && selectedUser.email}</Typography>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              <LockOutlined /> City
            </Typography>
            <Typography>{selectedUser && selectedUser.city}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              <ClockCircleOutlined /> Status
            </Typography>
            <Button
              variant="solid"
              color={
                selectedUser && selectedUser.status.status ? "green" : "danger"
              }
              onClick={() => chek(selectedUser && selectedUser.id)}
            >
              {selectedUser && selectedUser.status ? "ACTIVE" : "INACTIVE"}
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              <PhoneOutlined /> Phone
            </Typography>
            <Typography>{selectedUser && selectedUser.phone}</Typography>
          </div>
        </div>
        <Divider />
      </Drawer>
      {/*Modal Edit*/}
      <Modal
        title="Add New"
        open={isModalOpen}
        onOk={() => handleOk(false, editUser)}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3vh",
            alignItems: "start",
          }}
        >
          <Input
            value={editUser.avatar}
            onChange={(e) => setEditUser({ ...editUser, avatar: e.target.value })}
            placeholder=".png / .jpg / .jpeg"
          />
          <Input
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            placeholder="Name"
          />
          <Input
            value={editUser.suranme}
            onChange={(e) =>
              setEditUser({ ...editUser, suranme: e.target.value })
            }
            placeholder="Surname"
          />
          <Input
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            placeholder="Email"
          />
          <Select
            value={editUser.status}
            onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
            style={{ width: "100%" }}
            placeholder="Choose Status"
          >
            <Select.Option value="true">Active</Select.Option>
            <Select.Option value="false">Inactive</Select.Option>
          </Select>
          <Select
            value={editUser.city}
            onChange={(e) => setEditUser({ ...editUser, city: e.target.value })}
            style={{ width: "100%" }}
            placeholder="Choose City"
          >
            <Select.Option value="Dushanbe">Dushanbe</Select.Option>
            <Select.Option value="Khujand">Khujand</Select.Option>
            <Select.Option value="Kulob">Kulob</Select.Option>
            <Select.Option value="Bokhtar">Bokhtar</Select.Option>
          </Select>
          <Input
            value={editUser.phone}
            onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
            placeholder="Phone"
            type="phone"
          />
        </div>
      </Modal>
      {/*Modal Add*/}
      <Modal
        title="Add NEW"
        open={isModalOpen}
        onOk={() => handleOk(false, addUser)}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3vh",
            alignItems: "start",
          }}
        >
          <Input
            value={addUser.avatar}
            onChange={(e) => setAddUser({ ...addUser, avatar: e.target.value })}
            placeholder=".png / .jpg / .jpeg"
          />
          <Input
            value={addUser.name}
            onChange={(e) => setAddUser({ ...addUser, name: e.target.value })}
            placeholder="Name"
          />
          <Input
            value={addUser.suranme}
            onChange={(e) =>
              setAddUser({ ...addUser, suranme: e.target.value })
            }
            placeholder="Surname"
          />
          <Input
            value={addUser.email}
            onChange={(e) => setAddUser({ ...addUser, email: e.target.value })}
            placeholder="Email"
          />
          <Select
            value={addUser.status}
            onChange={(e) => setAddUser({ ...addUser, status: e.target.value })}
            style={{ width: "100%" }}
            placeholder="Choose Status"
          >
            <Select.Option value="true">Active</Select.Option>
            <Select.Option value="false">Inactive</Select.Option>
          </Select>
          <Select
            value={addUser.city}
            onChange={(e) => setAddUser({ ...addUser, city: e.target.value })}
            style={{ width: "100%" }}
            placeholder="Choose City"
          >
            <Select.Option value="Dushanbe">Dushanbe</Select.Option>
            <Select.Option value="Khujand">Khujand</Select.Option>
            <Select.Option value="Kulob">Kulob</Select.Option>
            <Select.Option value="Bokhtar">Bokhtar</Select.Option>
          </Select>
          <Input
            value={addUser.phone}
            onChange={(e) => setAddUser({ ...addUser, phone: e.target.value })}
            placeholder="Phone"
            type="phone"
          />
        </div>
      </Modal>
    </div>
  );
}
