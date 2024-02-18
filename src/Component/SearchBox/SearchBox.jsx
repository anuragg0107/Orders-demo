import React from "react";
import { Button } from "react-bootstrap";

const SearchBox = () => {
  return (
    <div className="main-box shadow p-3 mb-5 bg-white rounded d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between">
      <div className="mb-3 mb-lg-0">
        <h6>What are you looking for?</h6>
        <div className="input-group" style={{ maxWidth: "500px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search for category, name, company, etc."
          />
        </div>
      </div>
      <div className="mb-3 mb-lg-0">
        <h6>Category</h6>
        <select className="form-select">
          <option value="All">All</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </select>
      </div>
      <div className="mb-3 mb-lg-0">
        <h6>Status</h6>
        <select className="form-select">
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="mt-3 mt-lg-3">
        <Button
          className="btn btn-outline-secondary text-white"
          style={{ width: "100%" }}
          type="button"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBox;
