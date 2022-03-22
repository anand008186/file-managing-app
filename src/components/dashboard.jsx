import React, { useState, useEffect } from "react";
import "../App.css";
import { storage, auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import FileList from "./FileList";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function Dashboard() {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [fileList, setFileList] = useState([]);
  const [User, setUser] = useState({ phone: "", name: "" });

  useEffect(async () => {
    if (!user) {
      navigate("/signIn");
    }
    await fetchAllFiles();
  }, []);

  //  Merging all pdf files

  // Fetching all file lists
  const [user] = useAuthState(auth);
  const fetchAllFiles = async () => {
    const List = await listAll(ref(storage, `/files`));

    console.log(List);
    console.log(auth.currentUser);
    const PDFLists = List.items.map((item) => item.name);

    setFileList(PDFLists);
    console.log(fileList);
  };

  const upload = async (e) => {
    e.preventDefault();
    console.log(file);
    if (file === "") {
      return alert("choose the file");
    } else {
      const storageRef = ref(storage, `/files/${file.name}`);
      try {
        const uploadTask = await uploadBytes(storageRef, file);
        if (uploadTask) {
          alert("file uploaded successfully");
          await fetchAllFiles();
        }
      } catch (error) {
        alert("Some error occured");
      }
    }
  };

  //dowload files
  const downloadFile = async (fileName) => {
    const URL = await getDownloadURL(ref(storage, `files/${fileName}`));
    window.open(URL, "_blank");
  };
  // delete files
  const deleteFile = async (fileName) => {
    try {
      await deleteObject(ref(storage, `/files/${fileName}`));
      alert("File deleted successfully");
      await fetchAllFiles();
      setFile({ file: "" });
    } catch (error) {
      alert(error);
    }
  };

  //logout functionality
  const logout = async () => {
    await auth.signOut();
    navigate("/signIn");
  };

  return (
    <div className="dashboard-container">
      <ul className="navbar-nav me-5">
        <li
          className="nav-item dropdown ms-auto"
          style={{ fontSize: "1.5rem", color: "black" }}
        >
          <a
            className="nav-link dropdown-toggle "
            style={{ color: "grey" }}
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className="bi bi-person-circle me-2"
              style={{ color: "black" }}
            ></i>
            Profile
          </a>
          <ul className="dropdown-menu me-5" aria-labelledby="navbarDropdown">
            <li>
              <a className="dropdown-item" href="#">
                Mobile No : {User.phone}{" "}
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Username :{User.name}
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <div className="upload-section">
        <center>
          <h2 className="mb-3">Choose any pdf file to upload</h2>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <button onClick={upload} className="btn btn-outline-success ">
            Upload
          </button>
        </center>
      </div>
      <FileList
        List={fileList}
        downloadFile={downloadFile}
        deleteFile={deleteFile}
      />

      <div style={{ marginTop: 30 }}>
        <center>
          <button
            className="btn btn-lg btn-outline-dark  d-block mb-2 shadow-none"
            onClick={() => alert("This funcnality is unavailable now")}
            style={{ marginLeft: "20px" }}
          >
            Merge all PDFs
          </button>
          <button
            className="btn btn-danger"
            style={{ marginLeft: "20px" }}
            onClick={logout}
          >
            Logout
          </button>
        </center>
      </div>
    </div>
  );
}

export default Dashboard;
