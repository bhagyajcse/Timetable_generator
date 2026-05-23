import React, { useEffect, useState } from "react";
import axios from "axios";

import Login from "./Login";
import "./App.css";

const API = "http://localhost:5000/api";

function App() {

  // =====================================
  // LOGIN STATE
  // =====================================

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  // =====================================
  // DATA STATES
  // =====================================

  const [faculty, setFaculty] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [sections, setSections] =
    useState([]);

  // STUDENT TIMETABLE ONLY
  const [timetable, setTimetable] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // =====================================
  // FORM STATES
  // =====================================

  const [facultyForm, setFacultyForm] =
    useState({
      name: "",
      code: ""
    });

  const [subjectForm, setSubjectForm] =
    useState({
      name: "",
      code: "",
      facultyId: "",
      isLab: false
    });

  const [sectionForm, setSectionForm] =
    useState({
      name: "",
      year: ""
    });

  // =====================================
  // LOAD INITIAL DATA
  // =====================================

  useEffect(() => {

    fetchAll();

  }, []);

  // =====================================
  // FETCH ALL DATA
  // =====================================

  const fetchAll = async () => {

    try {

      const [f, s, c] =
        await Promise.all([

          axios.get(`${API}/faculty`),

          axios.get(`${API}/subjects`),

          axios.get(`${API}/sections`)

        ]);

      setFaculty(f.data || []);

      setSubjects(s.data || []);

      setSections(c.data || []);

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Failed to load data"
      );

    }

  };

  // =====================================
  // ADD FACULTY
  // =====================================

  const addFaculty = async () => {

    try {

      await axios.post(
        `${API}/faculty`,
        facultyForm
      );

      setFacultyForm({
        name: "",
        code: ""
      });

      setMessage(
        "Faculty added successfully"
      );

      fetchAll();

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Failed to add faculty"
      );

    }

  };

  // =====================================
  // DELETE FACULTY
  // =====================================

  const deleteFaculty = async (id) => {

    try {

      await axios.delete(
        `${API}/faculty/${id}`
      );

      setMessage(
        "Faculty deleted successfully"
      );

      fetchAll();

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Failed to delete faculty"
      );

    }

  };

  // =====================================
  // ADD SUBJECT
  // =====================================

  const addSubject = async () => {

    try {

      await axios.post(
        `${API}/subjects`,
        subjectForm
      );

      setSubjectForm({
        name: "",
        code: "",
        facultyId: "",
        isLab: false
      });

      setMessage(
        "Subject added successfully"
      );

      fetchAll();

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Failed to add subject"
      );

    }

  };

  // =====================================
  // DELETE SUBJECT
  // =====================================

  const deleteSubject = async (id) => {

    try {

      await axios.delete(
        `${API}/subjects/${id}`
      );

      setMessage(
        "Subject deleted successfully"
      );

      fetchAll();

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Failed to delete subject"
      );

    }

  };

  // =====================================
  // ADD SECTION
  // =====================================

  const addSection = async () => {

    try {

      await axios.post(
        `${API}/sections`,
        sectionForm
      );

      setSectionForm({
        name: "",
        year: ""
      });

      setMessage(
        "Section added successfully"
      );

      fetchAll();

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Failed to add section"
      );

    }

  };

  // =====================================
  // DELETE SECTION
  // =====================================

  const deleteSection = async (id) => {

    try {

      await axios.delete(
        `${API}/sections/${id}`
      );

      setMessage(
        "Section deleted successfully"
      );

      fetchAll();

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Failed to delete section"
      );

    }

  };

  // =====================================
  // GENERATE TIMETABLE
  // =====================================

  const generateTimetable = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(
          `${API}/timetable/generate`
        );

      // IMPORTANT FIX
      setTimetable(
        response.data.studentTimetable || []
      );

      setMessage(
        "Timetable generated successfully"
      );

    } catch (err) {

      console.error(err);

      setMessage(
        err.response?.data?.message ||
        "Error generating timetable"
      );

    } finally {

      setLoading(false);

    }

  };

  // =====================================
  // LOGIN PAGE
  // =====================================

  if (!isLoggedIn) {

    return (
      <Login
        onLogin={setIsLoggedIn}
      />
    );

  }

  // =====================================
  // MAIN UI
  // =====================================

  return (

    <div className="app">

      <h1>
        Automatic Timetable Generator
      </h1>

      {
        message && (
          <div className="alert">
            {message}
          </div>
        )
      }

      {/* ========================= */}
      {/* INPUT CARDS */}
      {/* ========================= */}

      <div className="grid">

        {/* FACULTY */}

        <div className="card">

          <h2>Add Faculty</h2>

          <input
            placeholder="Faculty Name"
            value={facultyForm.name}
            onChange={(e) =>
              setFacultyForm({
                ...facultyForm,
                name: e.target.value
              })
            }
          />

          <input
            placeholder="Faculty Code"
            value={facultyForm.code}
            onChange={(e) =>
              setFacultyForm({
                ...facultyForm,
                code: e.target.value
              })
            }
          />

          <button onClick={addFaculty}>
            Add Faculty
          </button>

          <h3>Faculty List</h3>

          {
            faculty.map((f) => (

              <div
                key={f._id}
                className="list-item"
              >

                <span>
                  {f.name}
                  {" "}
                  ({f.code})
                </span>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteFaculty(f._id)
                  }
                >

                  Delete

                </button>

              </div>

            ))
          }

        </div>

        {/* SUBJECT */}

        <div className="card">

          <h2>Add Subject</h2>

          <input
            placeholder="Subject Name"
            value={subjectForm.name}
            onChange={(e) =>
              setSubjectForm({
                ...subjectForm,
                name: e.target.value
              })
            }
          />

          <input
            placeholder="Subject Code"
            value={subjectForm.code}
            onChange={(e) =>
              setSubjectForm({
                ...subjectForm,
                code: e.target.value
              })
            }
          />

          <select
            value={subjectForm.facultyId}
            onChange={(e) =>
              setSubjectForm({
                ...subjectForm,
                facultyId: e.target.value
              })
            }
          >

            <option value="">
              Select Faculty
            </option>

            {
              faculty.map((f) => (

                <option
                  key={f._id}
                  value={f._id}
                >

                  {f.name}

                </option>

              ))
            }

          </select>

          <label className="checkbox-row">

            <input
              type="checkbox"
              checked={subjectForm.isLab}
              onChange={(e) =>
                setSubjectForm({
                  ...subjectForm,
                  isLab: e.target.checked
                })
              }
            />

            Lab Subject

          </label>

          <button onClick={addSubject}>
            Add Subject
          </button>

          <h3>Subject List</h3>

          {
            subjects.map((s) => (

              <div
                key={s._id}
                className="list-item"
              >

                <span>

                  {s.name}
                  {" "}
                  ({s.code})
                  {" - "}
                  {s.facultyId?.name ||
                    "No Faculty"}

                </span>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteSubject(s._id)
                  }
                >

                  Delete

                </button>

              </div>

            ))
          }

        </div>

        {/* SECTION */}

        <div className="card">

          <h2>Add Section</h2>

          <input
            placeholder="Section Name"
            value={sectionForm.name}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                name: e.target.value
              })
            }
          />

          <input
            placeholder="Year"
            value={sectionForm.year}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                year: e.target.value
              })
            }
          />

          <button onClick={addSection}>
            Add Section
          </button>

          <h3>Section List</h3>

          {
            sections.map((sec) => (

              <div
                key={sec._id}
                className="list-item"
              >

                <span>

                  {sec.name}
                  {" "}
                  ({sec.year})

                </span>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteSection(sec._id)
                  }
                >

                  Delete

                </button>

              </div>

            ))
          }

        </div>

      </div>

      {/* ========================= */}
      {/* GENERATE BUTTON */}
      {/* ========================= */}

      <div className="card">

        <h2>
          Generate Timetable
        </h2>

        <button
          onClick={generateTimetable}
          disabled={loading}
        >

          {
            loading
              ? "Generating..."
              : "Generate"
          }

        </button>

      </div>

      {/* ========================= */}
      {/* TIMETABLE DISPLAY */}
      {/* ========================= */}

      <div className="card">

        <h2>
          Generated Timetable
        </h2>

        {
          timetable.length === 0 ? (

            <p>
              No timetable generated yet.
            </p>

          ) : (

            timetable.map((sec, i) => (

              <div
                key={i}
                className="timetable-block"
              >

                <h3>
                  Class:
                  {" "}
                  {sec.section}
                </h3>

                <table className="timetable-table">

                  <thead>

                    <tr>

                      <th>
                        Day / Time
                      </th>

                      <th>8-9</th>

                      <th>9-10</th>

                      <th>
                        Short Break
                      </th>

                      <th>10:20-11:20</th>

                      <th>11:20-12:20</th>

                      <th>
                        Lunch Break
                      </th>

                      <th>1-2</th>

                      <th>2-3</th>

                      <th>3-4</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      Object.entries(
                        sec.timetable
                      ).map(
                        ([day, slots]) => (

                          <tr key={day}>

                            <td className="day-cell">
                              {day}
                            </td>

                            {
                              slots.map(
                                (slot, idx) => (

                                  <td
                                    key={idx}
                                  >

                                    {
                                      slot.type ===
                                      "BREAK"
                                        ? (
                                          <div className="break-text">
                                            {slot.subject}
                                          </div>
                                        )
                                        : (
                                          <>
                                            <div className="slot-subject">
                                              {slot.subject}
                                            </div>

                                            <div className="slot-faculty">
                                              {slot.faculty}
                                            </div>

                                            <div className="slot-type">
                                              {slot.type}
                                            </div>
                                          </>
                                        )
                                    }

                                  </td>

                                )
                              )
                            }

                          </tr>

                        )
                      )
                    }

                  </tbody>

                </table>

              </div>

            ))

          )
        }

      </div>

    </div>

  );

}

export default App;