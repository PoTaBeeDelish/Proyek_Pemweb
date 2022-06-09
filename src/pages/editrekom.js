import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
// Importing React Hooks
import { useState, useEffect } from 'react';
// Importing Packages
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";


function App() {
	const [loading, setloading] = useState(true); // Pre-loader before page renders
    const [tasks, setTasks] = useState([]); // Task State
    const [showAddTask, setShowAddTask] = useState(false); // To reveal add task form

    // Pre-loader
    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 3500);
    }, [])

    // Fetching from Local Storage
    const getTasks = JSON.parse(localStorage.getItem("taskAdded"));

    useEffect(() => {
        if (getTasks == null) {
            setTasks([])
        } else {
            setTasks(getTasks);
        }
        // eslint-disable-next-line
    }, [])

    // Add Task
    const addTask = (task) => {
        const id = uuidv4();
        const newTask = { id, ...task }

        setTasks([...tasks, newTask]);

        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully added a new task!'
        })

        localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
    }

    // Delete Task
    const deleteTask = (id) => {
        const deleteTask = tasks.filter((task) => task.id !== id);

        setTasks(deleteTask);

        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'You have successfully deleted a task!'
        })

        localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
    }

    // Edit Task
    const editTask = (id) => {

        const text = prompt("Task Name");
        const day = prompt("Day and Time");
        let data = JSON.parse(localStorage.getItem('taskAdded'));

        const myData = data.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    text: text,
                    day: day,
                    id: uuidv4()
                }
            }
            return x;
        })

        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'You have successfully edited an existing task!'
        })

        localStorage.setItem("taskAdded", JSON.stringify(myData));
        window.location.reload();
    }


  return (
    <div className="">
      <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
      
      {showAddTask && <AddTask onSave={addTask} />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Deskripsi</th>
            <th>Lokasi</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {persons &&
            persons.map((person, index) => (
              <tr>
                <>
                  <td>{index + 1}</td>
                  <td>{person.fname}</td>
                  <td>{person.lname}</td>
                  <td>{person.age}</td>
                  <td>
                    <Tasks>
                  </td>
                </>
              </tr>
            ))}
        </tbody>
      </Table>
  );
}

export default App;