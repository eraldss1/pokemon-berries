import React, { useState, useEffect } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Form, Modal, Button, Row, Col } from "react-bootstrap";

import "../static/css/list_berries.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { getBerryDetails } from "../apis/getBerryDetails";

const ListBerries = (props) => {
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");

  const [show, setShow] = useState(false);
  const [currentBerry, setCurrentBerry] = useState(null);
  const handleClose = () => setShow(false);

  async function handleShow(url) {
    setCurrentBerry(await getBerryDetails(url));
    setShow(true);
  }

  useEffect(() => {
    if (props.loaded && props.data !== null) {
      setFilteredData(props.data);
    }
  }, [props.loaded, props.data]);

  useEffect(() => {
    if (props.loaded) {
      let newFilteredData = props.data.filter((element) => {
        return element.name.includes(query);
      });
      setFilteredData(newFilteredData);
    }
  }, [query]); // eslint-disable-line

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  function listFlavors(flavors) {
    let rows = [];
    flavors.forEach((element, index) => {
      if (element.potency > 0) {
        rows.push(
          <>
            <u>
              {element.flavor.name} - {element.potency}
            </u>
            &nbsp; &nbsp;
          </>
        );
      }
    });

    return rows;
  }

  function capitalizeFirstLetter(str) {
    str = str[0].toUpperCase() + str.substr(1);
    return str;
  }

  return (
    <div className="wrapper">
      <div className="w-100">
        <h5>Pokemon Berries</h5>
        <p>
          Implementation of :{" "}
          <a href="https://pokeapi.co/docs/v2#berries-section">PokeAPI</a>
        </p>
      </div>

      {/*  */}
      <Form autoComplete="off" className="mb-3 w-100">
        <Form.Control
          type="text"
          placeholder="Find Berries"
          name="find_berries"
          value={query}
          onChange={handleQuery}
        />
      </Form>

      {/*  */}
      <Table striped>
        <thead>
          <tr>
            <th width={"20%"} style={{ textAlign: "center" }}>
              No.
            </th>
            <th width={"40%"}>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            <>
              {filteredData.map((element, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{capitalizeFirstLetter(element.name)}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => handleShow(element.url)}
                    />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No data!
                </td>
              </tr>
            </>
          )}
        </tbody>
      </Table>

      {/*  */}
      {currentBerry ? (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {capitalizeFirstLetter(currentBerry.name)}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-2">
                <Col>
                  <h6>Flavors</h6>
                  {listFlavors(currentBerry.flavors)}
                </Col>
              </Row>

              {/*  */}
              <Row className="mb-2">
                <Col>
                  <h6>Firmness</h6>
                  {currentBerry.firmness.name}
                </Col>
                <Col>
                  <h6>Smoothness</h6>
                  {currentBerry.smoothness}
                </Col>
              </Row>

              {/*  */}
              <Row className="mb-2">
                <Col>
                  <h6>Growth Time</h6>
                  {currentBerry.growth_time}
                </Col>

                <Col>
                  <h6>Max harvest</h6>
                  {currentBerry.max_harvest}
                </Col>
              </Row>

              {/*  */}
              <Row className="mb-2">
                <Col>
                  <h6>Natural Gift Type</h6>
                  {currentBerry.natural_gift_type.name}
                </Col>
                <Col>
                  <h6>Natural Gift Power</h6>
                  {currentBerry.natural_gift_power}
                </Col>
              </Row>

              {/*  */}
              <Row className="mb-2">
                <Col>
                  <h6>Size</h6>
                  {currentBerry.size}
                </Col>
                <Col>
                  <h6>Soil Dryness</h6>
                  {currentBerry.soil_dryness}
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ListBerries;
