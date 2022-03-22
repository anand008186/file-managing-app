import React from "react";

function FileList(props) {
  const fileList = props.List;
  const Allfilelists = fileList.map((item) => {
    return (
      <>
        <tr>
          <td>{item}</td>
          <td>
            <button
              className="btn shadow-none"
              onClick={() => props.downloadFile(item)}
            >
              {" "}
              <i className="bi bi-file-earmark-arrow-down-fill"></i>{" "}
            </button>
          </td>
          <td>
            <button
              className="btn shadow-none"
              onClick={() => props.deleteFile(item)}
            >
              {" "}
              <i className="bi bi-trash3 text-danger"></i>{" "}
            </button>
          </td>
        </tr>
      </>
    );
  });
  return (
    <>
      <h3>ALl uploaded files</h3>
      <table className="table bg-white rounded shadow-sm  table-hover">
        <thead>
          <tr>
            <th scope="col">file name</th>
            <th scope="col">Download Link</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>{Allfilelists}</tbody>
      </table>
    </>
  );
}

export default FileList;
