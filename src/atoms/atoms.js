import { atom } from "jotai";
import user from "../assets/img/rober.png";
export const Users = atom([
  {
    id: 1,
    avatar: { user },
    name: "Robert",
    suranme: "Robinson",
    email: "robert@gamil.com",
    city: "Dushanbe",
    status: false,
    phone: "999888211",
  },
  {
    id: 2,
    avatar: { user },
    name: "Jack",
    suranme: "London",
    email: "london@gamil.com",
    city: "Khujand",
    status: false,
    phone: "999888211",
  },
  {
    id: 3,
    avatar: { user },
    name: "Steve",
    suranme: "Jobs",
    email: "stevejob@gamil.com",
    city: "California",
    status: true,
    phone: "999888211",
  },
]);

export const open = atom(false);

export const selected = atom(null);

export const modalOpen = atom(false);

export const addNewUser = atom({
  id: Date.now(),
  avatar: "",
  name: "",
  suranme: "",
  email: "",
  city: "",
  status: false,
  phone: "",
});

export const editThisUser = atom({
   id: null,
   avatar: "",
   name: "",
   surname: "", // Исправлено!
   email: "",
   city: "",
   status: false,
   phone: "",
 });
 

export const searchBy = atom("");
