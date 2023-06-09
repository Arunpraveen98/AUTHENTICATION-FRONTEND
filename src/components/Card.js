import React from "react";
// -----------------
const Card = ({ post }) => {
  return (
    <div className="card">
      <span className="link" to={"/login"}>
        <span className="title">{post.title}</span>
        <img src={post.img} alt="" className="img" />
        <p className="desc">{post.desc}</p>
        <button className="cardButton">Read More</button>
      </span>
    </div>
  );
};
// -----------------
export default Card;
// -----------------