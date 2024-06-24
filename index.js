const express = require('express');
const cors=require('cors');

const  app = express();

app.use(express.json());
app.use(cors())

let students = [
    { id: 1, name: 'John Doe', roll: '101', class: '10th' },
    { id: 2, name: 'Jane Doe', roll: '102', class: '10th' },
];


const findStudentById = (id) => students.find(student => student.id === id);

// Create
app.post('/students', (req, res) => {
    const { id, name, roll, class: studentClass } = req.body;
    const newStudent = { id, name, roll, class: studentClass };
    students.push(newStudent);
    res.status(201).send(newStudent);
});

// Read all
app.get('/students', (req, res) => {
    res.send(students);
});

// Read one by ID
app.get('/students/:id', (req, res) => {
    const student = findStudentById(parseInt(req.params.id));
    if (!student) {
        return res.status(404).send({ message: 'Student not found' });
    }
    res.send(student);
});

// Update
app.put('/students/:id', (req, res) => {
    const student = findStudentById(parseInt(req.params.id));
    if (!student) {
        return res.status(404).send({ message: 'Student not found' });
    }

    const { name, roll, class: studentClass } = req.body;
    student.name = name !== undefined ? name : student.name;
    student.roll = roll !== undefined ? roll : student.roll;
    student.class = studentClass !== undefined ? studentClass : student.class;
    res.send(student);
});

// Delete
app.delete('/students/:id', (req, res) => {
    const studentIndex = students.findIndex(student => student.id === parseInt(req.params.id));
    if (studentIndex === -1) {
        return res.status(404).send({ message: 'Student not found' });
    }
    const deletedStudent = students.splice(studentIndex, 1);
    res.send(deletedStudent[0]);
});



app.listen(3000,()=>{
    console.log('listening on', 3000);
})
