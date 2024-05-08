import React, { useEffect, useState } from "react";
import "./TodoList.scss";
import { ImBin } from "react-icons/im";
import { MdOutlineEdit } from "react-icons/md";

const TodoList = () => {
    const storedItems = JSON.parse(localStorage.getItem("students")) || [];
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [tel, setTel] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [students, setStudents] = useState(storedItems);
    const [editStudent, setEditStudent] = useState(null);
    const [studentDetails, setStudentDetails] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editStudent) {
            let index = students?.findIndex((el) => el.id === editStudent.id);
            let updatedStudent = {
                id: editStudent.id,
                fullName,
                birthDate,
                tel,
                address,
                gender,
            };
            let updatedStudents = students;
            updatedStudents.splice(index, 1, updatedStudent);
            setStudents(updatedStudents);
            setEditStudent(null);
        } else {
            let student = {
                id: new Date().getTime(),
                fullName: fullName,
                birthDate: birthDate,
                tel: tel,
                address: address,
                gender: gender,
            };
            setStudents((prev) => [...prev, student]);
        }

        setFullName("");
        setBirthDate("");
        setTel("");
        setAddress("");
        setGender("");
    };

    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    const handleDeleteStudent = (id) => {
        setEditStudent(null);

        if (confirm("Are you sure")) {
            let filteredStudents = students?.filter((user) => user.id !== id);
            setStudents(filteredStudents);
        }
    };

    const handleEditStudent = (user) => {
        setEditStudent(user);
        setFullName(user.fullName);
        setBirthDate(user.birthDate);
        setTel(user.tel);
        setAddress(user.address);
        setGender(user.gender);
    };

    let student = students?.map((e) => (
        <div key={e.id} className="card">
            <div className="card__img"></div>
            <div className="card__info">
                <h3>Name: {e.fullName}</h3>
                <p>Birthdate: {e.birthDate}</p>
                <p>Phone: {e.tel}</p>
                <p>Address: {e.address}</p>
                <p>Gender: {e.gender}</p>
            </div>
            <div className="card__btns">
                <button
                    className="card__btns-delete"
                    onClick={() => handleDeleteStudent(e.id)}
                >
                    <ImBin />
                </button>
                <button
                    className="card__btns-edit"
                    onClick={() => handleEditStudent(e)}
                >
                    <MdOutlineEdit />
                </button>
            </div>
        </div>
    ));

    return (
        <>
            <div className="container student__info">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form__inputs">
                        <input
                            required
                            value={fullName}
                            type="text"
                            onChange={(event) =>
                                setFullName(event.target.value)
                            }
                            placeholder="Full Name"
                        />
                        <input
                            required
                            value={birthDate}
                            type="date"
                            placeholder="Birth date"
                            onChange={(event) =>
                                setBirthDate(event.target.value)
                            }
                        />
                        <input
                            required
                            value={tel}
                            type="number"
                            placeholder="Tel"
                            onChange={(event) => setTel(event.target.value)}
                        />
                        <input
                            required
                            value={address}
                            type="text"
                            placeholder="Address"
                            onChange={(event) => setAddress(event.target.value)}
                        />
                        <select name="gender" id="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <button className="form__btn">
                            {editStudent ? "Save" : "Create"}
                        </button>
                    </div>
                </form>
                <div className="wrapper">{student}</div>
            </div>
        </>
    );
};

export default TodoList;
