import { React, Fragment, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Entreno(props) {
  const [activeExercise, setActiveExercise] = useState(false);
  const [idEntreno, setIdEntreno] = useState(0);
  const [datos, setDatos] = useState({});

  const iniciarEntreno = () => {
    let requestPost = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idUsuario: props.idUsuario }),
    };
    const url = "https://api-ace2-pract2.herokuapp.com/entreno";
    //console.log(requestPost);
    fetch(url, requestPost)
      .then((response) => response.json())
      .then((data) => {
        if (data.auth === false) {
          setActiveExercise(false);
        } else {
          // console.log(data.idEntreno);
          setIdEntreno(data.idEntreno);
          setActiveExercise(true);
        }
      })
      .catch((err) => console.log(err));
    //
  };

  const finalizarEntreno = () => {
    setActiveExercise(false);
  };

  const getData = async () => {
    if (activeExercise === true) {
      let requestPost = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const url =
        "https://api-ace2-pract2.herokuapp.com/datosSensor/idEntreno/" +
        idEntreno;
      await fetch(url, requestPost)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          setDatos(data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    setTimeout(getData, 1000);
  });

  return (
    <Fragment>
      <br></br>
      <br></br>
      <Container>
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-primary" onClick={iniciarEntreno}>
            <img
              src="https://w7.pngwing.com/pngs/733/88/png-transparent-arrow-computer-icons-font-awesome-play-button-angle-rectangle-triangle-thumbnail.png"
              width="25%"
              alt="play"
            ></img>
          </Button>
          <Button variant="outline-danger" onClick={finalizarEntreno}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/26/26445.png"
              width="20%"
              alt="stop"
            ></img>
          </Button>
        </ButtonGroup>

        <Row>
          <Col>
            <br></br>
            <Card>
              <Card.Header>
                {" "}
                Ultimo registro (Ejercicio{" "}
                {activeExercise ? <b>habilitado</b> : <b>inhabilitado</b>})
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Numero de repeticiones: <h3>{datos.numRepeticiones}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Ultimo rango de movimiento:
                      <h3>{datos.rangoDistancia}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Calorias quemadas: <h3>{datos.calorias}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Frecuencia cardiaca: <h3>{datos.pulso} </h3>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export { Entreno };
