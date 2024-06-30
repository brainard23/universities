import { useEffect, useState } from "react";
import { db } from "../firebaseConfig.js";
import { collection, getDocs, addDoc } from "firebase/firestore";
import {
  IoIosSearch,
  IoMdArrowDropup,
  IoMdArrowDropdown,
  IoMdArrowBack,
  IoMdArrowRoundForward,
  IoIosAddCircleOutline,
} from "react-icons/io";
import "./styles.css";

const Table = () => {
  const [schools, setSchools] = useState([]);
  const [add, setAdd] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    country: "",
    classification: "",
    parent: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "schools"));
      const schoolsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchools(schoolsList);
    };
    fetchData();
  }, []);

  const newSchoolhandler = async () => {
    setAdd(2);
    if (add === 2) {
      setLoading(true);
      try {
        await addDoc(collection(db, "schools"), {
          name: form.name,
          country: form.country,
          classification: form.classification,
          parent: form.parent,
        });
        setLoading(false);
        setAdd(1);
        setForm({
          name: "",
          country: "",
          classification: "",
          parent: "",
        });
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const currentRows = filteredSchools.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearch = () => {
    const input = document.getElementById("input").value;
    setSearchKeyword(input);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div>
          <input id="input" placeholder="Filter by keyword" />
        </div>
        <div>
          <button onClick={handleSearch} className="flex gap-2 justify-center items-center bg-[#006646] text-white h-10 w-24 rounded m-1">
            <IoIosSearch className="mx-1" /> Search
          </button>
        </div>
      </div>
      <div className="table_component flex-col p-2" role="region" tabIndex="0">
        <div className="border-2 h-8 w-full flex justify-between items-center px-2">
          <button className="button">
            <IoMdArrowBack />
          </button>
          <div className="flex justify-between items-center">
            <div className="flex mr-48">
              Page
              <select
                className="dropdown"
                name="page"
                id="page"
                value={currentPage}
                onChange={(e) => paginate(parseInt(e.target.value, 10))}
              >
                {Array.from(
                  { length: Math.ceil(filteredSchools.length / rowsPerPage) },
                  (_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  )
                )}
              </select>
              of {Math.ceil(filteredSchools.length / rowsPerPage)}
            </div>
            <div>
              <select
                className="dropdown"
                name="result"
                style={{ width: 200 }}
                id="result"
                onChange={handleRowsPerPageChange}
                value={rowsPerPage}
              >
                <option value="5">Show 5 Result per page</option>
                <option value="10">Show 10 Result per page</option>
                <option value="20">Show 20 Result per page</option>
                <option value="30">Show 30 Result per page</option>
                <option value="40">Show 40 Result per page</option>
              </select>
            </div>
          </div>
          <button className="button">
            <IoMdArrowRoundForward />
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <div className="flex justify-start items-center">
                  Name{" "}
                  <span className="ml-1">
                    <IoMdArrowDropup />
                    <IoMdArrowDropdown />
                  </span>
                </div>
              </th>
              <th>
                <div className="flex justify-start items-center">
                  Country{" "}
                  <span className="ml-1">
                    <IoMdArrowDropup />
                    <IoMdArrowDropdown />
                  </span>
                </div>
              </th>
              <th>
                <div className="flex justify-start items-center">
                  Classification{" "}
                  <span className="ml-1">
                    <IoMdArrowDropup />
                    <IoMdArrowDropdown />
                  </span>
                </div>
              </th>
              <th>
                <div className="flex justify-start items-center">
                  Parent{" "}
                  <span className="ml-1">
                    <IoMdArrowDropup />
                    <IoMdArrowDropdown />
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((school) => (
              <tr key={school.id}>
                <td>{school.name}</td>
                <td>{school.country}</td>
                <td>{school.classification}</td>
                <td>{school.parent}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex-col m-2">
          {add === 2 && (
            <div className="">
              <input
                placeholder="Name"
                className="border-2 mx-2 p-2"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                value={form.name}
              />
              <input
                placeholder="Country"
                className="border-2 mx-2 p-2"
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                value={form.country}
              />
              <input
                placeholder="Classification"
                className="border-2 mx-2 p-2"
                onChange={(e) =>
                  setForm({ ...form, classification: e.target.value })
                }
                value={form.classification}
              />
              <input
                placeholder="Parent"
                className="border-2 mx-2 p-2"
                onChange={(e) => setForm({ ...form, parent: e.target.value })}
                value={form.parent}
              />
            </div>
          )}
          <div className="flex justify-center items-center m-2">
            <button
              disabled={loading}
              type="submit"
              onClick={newSchoolhandler}
              className="flex justify-center items-center bg-[#006646] text-white h-10 rounded p-2 gap-2"
            >
              <IoIosAddCircleOutline />
              Create a New Establishment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
