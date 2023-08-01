import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import "./View.css";
import { PostContext } from "../../Store/PostContext";
import { FirebaseContext } from "../../Store/Context";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const { userId } = postDetails;
    const db = getFirestore(firebase);
    const q = query(collection(db, "products"), where("id", "==", userId));
    const singleProduct = onSnapshot(q, (querySnapshot) => {
      const product = [];
      querySnapshot.forEach((doc) => {
        product.push(doc.data());
      });
      console.log(singleProduct);
      setUserDetails(singleProduct);
    });
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails?.imageUrl} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
