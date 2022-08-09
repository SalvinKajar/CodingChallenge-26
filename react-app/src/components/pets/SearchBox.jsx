import React, { useState, useEffect } from "react";
import { findPets } from "../../services/PetServices";
import styles from "./Pets.module.scss";
import axios from "axios";
export const SearchBox = () => {

//     function addTowatchlist(){
//         var id1 = document.getElementById("id");
//         console.log(id1.value);
//         axios.post('localhost:8080/api/v2/addtowatchlist', {
//             id: id1.value,
//           })
//           .then(function (response) {
//             console.log("working");
//           })
//           .catch(function (error) {
//             return error;
//           });
// //         fetch('localhost:8080/api/v2/addtowatchlist', {
// //   method: 'POST',
// //   headers: {
// //     'Accept': 'application/json',
// //     'Content-Type': 'application/json'
// //   },
// //   body: JSON.stringify({
// //     id:id1
// //   })
// // });

//     }
    
  return (
    <>
    <h1>Add watchlist</h1>
    <form
                    id="main-login"
                    action="https://20220809t103911-dot-db-grads-7dhn-group-26.nw.r.appspot.com/api/v2/addtowatchlist/"
                    method="post">
                    <h2>
                        Admin UI Login
                    </h2>
                    <label>
                        <span class="number">ID:</span>
                        <input type="number" name="id"/><br/>
                    </label>
                    <br/>
                    
                    <div class="align-right">
                        <button type="submit">Submit</button>
                    </div>
                </form>
    </>

  
  )
};
