import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersFirebase,
  crearAerolinea,
  deleteAirline,
} from "../../redux/actions";

import { Delete, makeAdmin } from "../scripts/auth";

export default function Administration() {
  const dispatch = useDispatch();

  const allUser = useSelector((state) => state.allUsersFirebase);
  const user = allUser.filter(
    (user) => !user.hasOwnProperty("empresa") && !user.admin
  );
  const business = allUser.filter(
    (user) => user.hasOwnProperty("empresa") && user.empresa
  );
  const toBeBusiness = allUser.filter(
    (user) => user.hasOwnProperty("empresa") && !user.empresa
  );

  const [refreshAccounts, setRefreshAccounts] = useState(0);

  // business.map((u)=>console.log("empresas" ,u
  //     ))
  // console.log(user);
  // console.log(business);
  // console.log(toBeBusiness);
  async function acceptRequest(email) {
    //console.log(e.target.email.value);
    await makeAdmin(email);
    dispatch(crearAerolinea({ email }));
    // window.location.reload()
    setRefreshAccounts(refreshAccounts + 1);
  }

  async function deleteUser(UID, email) {
    await Delete(email, UID);
    business.filter((b) => b.email === email).length
      ? dispatch(deleteAirline(email))
      : console.log("no esta");
    //  aca va un loader porque las funciones se ejecutan tarde y se rompe con el window.location.reload()
    setRefreshAccounts(refreshAccounts + 1);
  }

  useEffect(() => {
    dispatch(getAllUsersFirebase());
    return () => {
      console.log("Will Unmount");
    };
  }, [dispatch, refreshAccounts]);
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>USERS</h2>

      {user.length ? (
        user.map((u) => {
          return (
            <div key={u.uid}>
              <br />
              <br />
              <div key={u.uid}>
                email: {u.email},Name: {u.name ? u.name : null}, uid: {u.uid}
              </div>
              <button
                onClick={() => {
                  deleteUser(u.uid, u.email);
                }}
              >
                Delete User
              </button>
            </div>
          );
        })
      ) : (
        <h1>No users?</h1>
      )}
    </div>
  );
}
