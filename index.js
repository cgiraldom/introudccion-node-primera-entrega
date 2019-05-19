const fs = require('fs');
const courses = require('./courses');
/* eslint-disable no-console */
function displayCourses(coursesArray) {
  coursesArray.forEach((course, index) => {
    setTimeout(() => {
      console.log(
        `ID del Curso: ${course.id}\n`,
        `Nombre del curso: ${course.nombre}\n`,
        `La duración es de: ${course.duracion} semanas\n`,
        `El valor de curso es: $${course.valor} pesos\n`,
      );
    }, (index + 1) * 2000);
  });
}

function inscribir(name, course) {
  const text = `${name} se ha inscrito satisfactoriamente al curso: \n
  ${course.nombre}\n
  Duración de ${course.duracion} semanas
  Valor de $ ${course.valor} pesos`;

  fs.writeFile('registroInscripcion.txt', text, (err) => {
    if (err) throw (err);
  });

  console.log(text);
}

const options = {
  courseId: {
    demand: true,
    alias: 'id',
  },
  name: {
    demand: true,
    alias: 'n',
  },
  userId: {
    demand: true,
    alias: 'uid',
  },
};

// eslint-disable-next-line import/order
const { argv } = require('yargs')
  .command('$0', 'Default', () => {}, () => displayCourses(courses))
  .command('inscribir', 'Inscribirse al curso seleccionado', options, (argv) => {
    const courseFound = courses.find(course => course.id === argv.courseId);

    if (courseFound) {
      inscribir(argv.name, courseFound);
    } else {
      console.log('Curso no encontrado, estos son los cursos disponibles:\n');
      displayCourses(courses);
    }
  });
