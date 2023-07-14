import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "antd";
import "./detail.scss";
function DetailPage() {
  const params = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const getData = async () => {
    const res = await axios.get(`http://localhost:8989/api/form/${params.id}`);
    setData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getData();
  });

  return (
    <>
      <div className="card">
        <h1 className="h1" style={{ textAlign: "center", fontSize: 55, paddingBottom: 25 }}>
          User Information
        </h1>
        <Card
          title={data.firstName}
          className="card-main"
          bordered={false}
          style={{ width: 390 , fontFamily: "Montserrat , sans-serif"}}
        >
          <div style={{display : "flex" , gap : 5}}>
          <label>FirstName : </label>
          <p>{data.firstName}</p>
          </div>
          <div style={{display : "flex" , gap : 5}}>
          <label>LastName : </label>
          <p>{data.lastName}</p>
          </div>
          <div style={{display : "flex" , gap : 5}}>
          <label>Email : </label>
          <p>{data.email}</p>
          </div>
          <div style={{display : "flex" , gap : 5}}>
          <label>ConfirmEmail : </label>
          <p>{data.confirmEmail}</p>
          </div>
          <div style={{display : "flex" , gap : 5}}>
          <label>Phone : </label>
          <p>{data.phone}</p>
          </div>
          <div style={{display : "flex" , gap : 5}}>
          <label>Rating : </label>
          <p>{data.rating}</p>
          </div>
        </Card>
          <button className="btn" style={{marginTop : 30, marginRight : 175}} onClick={() => navigate("/admin")}>Go To Admin Page</button>
      </div>
    </>
  );
}

export default DetailPage;
