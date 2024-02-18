import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../SearchBox/SearchBox";

const Table = () => {
  const [showModal, setShowModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editedEntry, setEditedEntry] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = (formData) => {
    if (editedEntry) {
        // update existing entry of the user
      const updatedData = tableData.map((entry) =>
        entry.id === editedEntry.id
          ? {
              ...entry,
              date: formData.get("date"),
              country: formData.get("country"),
              customer: formData.get("customer"),
              email: formData.get("email"),
            }
          : entry
      );
      setTableData(updatedData);
      setEditedEntry(null);
    } else {
      // Add new entry of user
      const newEntry = {
        id: Math.floor(Math.random() * 9000),
        shopify: Math.floor(Math.random() * 1000),
        date: formData.get("date"),
        country: formData.get("country"),
        customer: formData.get("customer"),
        email: formData.get("email"),
        shipping: "Austrialn Post Api",
        source: "ShopifyAU",
        orderType: "Customer",
      };
      setTableData([...tableData, newEntry]);
    }
    toggleModal();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (entry) => {
    setEditedEntry(entry);
    toggleModal();
  };

  return (
    <div className="bg-gray shadow rounded p-3 p-lg-4">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center mt-3 mb-4">
        <div className="mb-3 mb-lg-0">
          <h4 className="mb-0">Orders</h4>
        </div>
        <div>
          <Button className="btn-sm" onClick={toggleModal}>
            <h6 className="m-0">Create New</h6>
          </Button>
        </div>
      </div>
      {/* <div className="mb-4">
        <SearchBox />
      </div> */}

      <div className="table-responsive">
        <table className="table table-bordered table-striped rounded shadow">
          <thead className="text-center">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Shopify</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Customer</th>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
              <th scope="col">Shipping</th>
              <th scope="col">Source</th>
              <th scope="col">Order Type</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentItems.map((entry, index) => (
              <tr key={index}>
                <td>{entry.id}</td>
                <td>{entry.shopify}</td>
                <td>{entry.date}</td>
                <td>Status</td>
                <td>{entry.customer}</td>
                <td>{entry.email}</td>
                <td>{entry.country}</td>
                <td>{entry.shipping}</td>
                <td>{entry.source}</td>
                <td>{entry.orderType}</td>
                <td style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEdit(entry)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editedEntry ? "Edit Data" : "Create New Data"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleSubmit(formData);
            }}
          >
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                defaultValue={editedEntry ? editedEntry.date : ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                className="form-control"
                id="country"
                name="country"
                defaultValue={editedEntry ? editedEntry.country : ""}
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="Australia">Australia</option>
                <option value="Dubai">Dubai</option>
                <option value="Thailand">Thailand</option>
                <option value="Malaysia">Malaysia</option>
                <option value="America">America</option>
                <option value="Germany">Germany</option>
                <option value="South Africa">South Africa</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="customer">Customer</label>
              <input
                type="text"
                className="form-control"
                id="customer"
                name="customer"
                placeholder="Customer name"
                defaultValue={editedEntry ? editedEntry.customer : ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                defaultValue={editedEntry ? editedEntry.email : ""}
              />
            </div>

            <Button type="submit" className="btn btn-primary mt-2">
              {editedEntry ? "Update" : "Submit"}
            </Button>
            <Button
              variant="secondary"
              style={{ marginLeft: "20px" }}
              className="mt-2"
              onClick={toggleModal}
            >
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      <div className="pagination">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ marginRight: "20px" }}
        >
          Previous
        </Button>
        <Button onClick={() => paginate(currentPage + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default Table;
