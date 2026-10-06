import { useEffect, useState } from "react";
import { getUserProfile } from "../services/user";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../utils/constants";
import Loading from "../components/Loading";
import { Col, Image, Row } from "react-bootstrap";

function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    getUserProfile()
    .then((user) => {
        setUserInfo(user);
      })
      .catch((err) => {
        console.error(err.message);
        navigate(ROUTE_PATHS.HOME);
      });
  }, []);

  if (userInfo == undefined) {
    return <Loading />;
  }

  return (
    <Row>
      <Col xs={12} sm={8}>
        <div>
          <Image className="object-fit-cover" src={userInfo.profilePicture} width={100}  height={100} roundedCircle />
        </div>
      </Col>
      <Col xs={12} sm={4} className="text-center">
        <h5>Nivel de Estim</h5>
        <h1>{userInfo.profileLevel}</h1>
      </Col>
    </Row>
  )
}

export default Profile;