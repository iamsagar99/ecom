import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUserById } from "../../services/user.service";
const UserProfile = () => {
  const localUser = localStorage.getItem("auth_user");
  //{"name":"sagar","email":"sagarpdl1309@gmail.com","_id":"690f05270cddce5c28fa5619","role":["customer","admin"]}
  const userId = JSON.parse(localStorage.getItem("auth_user") || "{}")._id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await getUserById(userId);
        if (response?.status) {
          setUser(response.result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  const { name, email, phone, image, status, role, address } = user;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: 20 }}>
      <Card style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#eee",
            }}
          >
            {image ? (
              <img
                src={process.env.REACT_APP_IMAGE_URL+"/user/"+image}
                alt={name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ fontSize: 24, fontWeight: "bold" }}>
                {name?.charAt(0)}
              </span>
            )}
          </div>

          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700 }}>{name}</h1>
            <p>{email}</p>
            <p>{phone}</p>
            <span
              style={{
                display: "inline-block",
                marginTop: 6,
                padding: "4px 10px",
                borderRadius: 14,
                fontSize: 12,
                background: status === "active" ? "#c8f7c5" : "#f7c5c5",
                color: status === "active" ? "#257a1c" : "#a31c1c",
              }}
            >
              {status}
            </span>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Roles</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
            {role?.map((r) => (
              <span
                key={r}
                style={{
                  padding: "4px 10px",
                  background: "#d0e7ff",
                  color: "#0d3b66",
                  borderRadius: 14,
                  fontSize: 12,
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Address</h2>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 10 }}>
            <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, background: "white", flex: 1 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600 }}>Shipping Address</h3>
              <p>
                <strong>Address:</strong> {address?.shipping?.address}
              </p>
              <p>
                <strong>House No:</strong> {address?.shipping?.house_no}
              </p>
            </div>

            <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, background: "white", flex: 1 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600 }}>Billing Address</h3>
              <p>
                <strong>Address:</strong> {address?.billing?.address}
              </p>
              <p>
                <strong>House No:</strong> {address?.billing?.house_no}
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 30, display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button style={{ padding: "8px 16px", border: "1px solid #444", borderRadius: 6 }}>Edit Profile</button>
          <button style={{ padding: "8px 16px", background: "#007bff", color: "white", borderRadius: 6, border: "none" }}>
            Edit Address
          </button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
