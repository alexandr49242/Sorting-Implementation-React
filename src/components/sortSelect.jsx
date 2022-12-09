import React from "react";
import PropTypes from "prop-types";

const SortSelect = ({ value, options, onSort }) => {
  return (
    <div className="d-flex align-items-center mt-4">
      <span className="d-block me-2">сортировка</span>
      <select value={value} onChange={onSort} className="form-select">
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

SortSelect.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sort: PropTypes.func.isRequired
    })
  ).isRequired,
  onSort: PropTypes.func.isRequired
};

export default SortSelect;
