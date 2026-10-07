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

  if (userInfo === undefined) {
    return <Loading />;
  }

  return (
    <>
      <h1>Mi perfil</h1>
      <hr />
      <Row className="mt-4">
        <Col xs={12} sm={4} className="text-center mb-4">
          <Image
            className="object-fit-cover"
            src={userInfo.profilePicture}
            alt={`Foto de perfil de ${userInfo.name}`}
            width={140}
            height={140}
            roundedCircle
          />
        </Col>
        <Col xs={12} sm={8}>
          <h4>{userInfo.name} {userInfo.lastname}</h4>
          <p className="text-muted mb-4">{userInfo.email}</p>

          <Row>
            <Col xs={6} className="mb-3">
              <small className="text-muted d-block">Cliente desde</small>
              <strong>{userInfo.memberSince}</strong>
            </Col>
            <Col xs={6} className="mb-3">
              <small className="text-muted d-block">Pedidos realizados</small>
              <strong>{userInfo.totalOrders}</strong>
            </Col>
            <Col xs={6} className="mb-3">
              <small className="text-muted d-block">Categoría favorita</small>
              <strong>{userInfo.favoriteCategory}</strong>
            </Col>
            <Col xs={6} className="mb-3">
              <small className="text-muted d-block">Fecha de nacimiento</small>
              <strong>{userInfo.birthDate}</strong>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Profile;