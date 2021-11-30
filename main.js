document.addEventListener('DOMContentLoaded', () => {
  //СОЗДАЁМ РАЗМЕТКУ
  const container = document.querySelector('.container');

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let currentDay = new Date().getDate();

  //Фильтрация по студентам
  function createStudentsSearch() {
    let title = document.createElement('h2');
    title.innerHTML = 'Фильтрация по базе студентов';
    title.classList.add('h2');
    container.append(title);

    let formLeft = document.createElement('div');
    let formRight = document.createElement('div');
    formLeft.classList.add('d-flex', 'mt-3');
    formRight.classList.add('d-flex', 'mt-3');
    container.append(formLeft);
    container.append(formRight);

    let elements = [
      { id: 'searchFullName', text: 'Поиск&nbsp;по&nbsp;ФИО', type: 'text'},
      { id: 'searchFaculty', text: 'Поиск&nbsp;по&nbsp;Факультету', type: 'text'},
      { id: 'searchStartStudy', text: 'Поиск&nbsp;по&nbsp;году начала&nbsp;обучения', type: 'text'},
      { id: 'searchEndStudy', text: 'Поиск&nbsp;по&nbsp;году окончания&nbsp;обучения', type: 'text'}
    ];

    elements.forEach((element, index) => {
      const label = document.createElement('label');
      const input = document.createElement('input');

      label.setAttribute('for', element.id);
      label.classList.add('form-label', 'pe-5');
      label.innerHTML = element.text;

      input.setAttribute('type', element.type);
      input.classList.add('form-control', 'me-5');
      input.id = element.id;

      if (index < 2) {
        formLeft.append(label);
        formLeft.append(input);
      } else {
        formRight.append(label);
        formRight.append(input);
      };
    });
  };

  createStudentsSearch();

  //Таблица студентов
  function createStudentsTable() {
    let table = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableBody = document.createElement('tbody');
    let tableHeadRow = document.createElement('tr');

    table.classList.add('table', 'mt-5');
    container.append(table);
    table.append(tableHead);
    table.append(tableBody);
    tableHead.append(tableHeadRow);

    let elements = [
      { text: 'ФИО', id: 'filterFullName' },
      { text: 'Факультет', id: 'filterFaculty' },
      { text: 'Дата рождения (возраст)', id: 'filterDate' },
      { text: 'Годы обучения (курс)', id: 'filterStudyAndCourse' },
    ];

    elements.forEach(element => {
      let tableHeader = document.createElement('th');
      tableHeader.setAttribute('scope', 'col');
      tableHeadRow.append(tableHeader);

      let btn = document.createElement('button');
      btn.textContent = element.text;
      btn.id = element.id;

      tableHeader.append(btn);
    });
  };

  createStudentsTable();

  //Форма добавления нового студента
  function createAddStudentPlatform() {
    let form = document.createElement('form');
    let title = document.createElement('h2');

    form.setAttribute('autocomplete', 'on');
    form.setAttribute('method', 'POST');
    form.id = 'addStudentForm';

    title.classList.add('h2', 'mb-3', 'mt-5');
    title.innerHTML = 'Форма добавления студента в базу данных';

    container.append(form);
    form.append(title);

    let elements = [
      { name: 'name', id:'inputName', text: 'Имя', type: 'text' },
      { name: 'surname', id:'inputSurname', text: 'Фамилия', type: 'text' },
      { name: 'middlename', id:'inputMiddleName', text: 'Отчество', type: 'text' },
      { name: 'birthdate', id:'inputBirthDate', text: 'Дата рождения', type: 'date' },
      { name: 'startStudyYear', id:'inputStartStudy', text: 'Год начала обучения', type: 'number' },
      { name: 'faculty', id:'inputFaculty', text: 'Факультет', type: 'text' }
    ];

    elements.forEach(element => {
      const div = document.createElement('div');
      const label = document.createElement('label');
      const input = document.createElement('input');

      form.append(div);
      div.append(label);
      div.append(input);

      div.classList.add('mb-3');

      label.classList.add('form-label');
      label.setAttribute('for', element.id);
      label.textContent = element.text;

      input.classList.add('form-control');
      input.id = element.id;
      input.setAttribute('type', element.type);
      input.setAttribute('name', element.name);
      input.setAttribute('required', 'required');

      if (element.type === 'date') {
        input.setAttribute('min', '1900-01-01');
        input.setAttribute('max', `${currentYear}-${currentMonth}-${currentDay}`);
      };

      if (element.type === 'number') {
        input.setAttribute('min', '2000');
        input.setAttribute('max', `${currentYear}`);
      };
    });

    let btn = document.createElement('button');
    btn.setAttribute('type', 'submit');
    btn.setAttribute('id', 'submitFormBtn');
    btn.classList.add('btn', 'btn-primary');
    btn.textContent = 'Добавить студента';
    form.append(btn);
  };

  createAddStudentPlatform();



  //ЛОГИКА
  const defaultStudents = [
    {
      name: 'Петр',
      surname: 'Волков',
      middleName: 'Иванович',
      birthDate: new Date(1995, 2, 8),
      startStudyYear: 2015,
      faculty: 'Юридический'
    },
    {
      name: 'Василий',
      surname: 'Архипов',
      middleName: 'Леонов',
      birthDate: new Date(1996, 4, 5),
      startStudyYear: 2016,
      faculty: 'Экономический'
    },
    {
      name: 'Архип',
      surname: 'Алексеев',
      middleName: 'Константинович',
      birthDate: new Date(1997, 6, 2),
      startStudyYear: 2017,
      faculty: 'Журналистика'
    },
    {
      name: 'Арсений',
      surname: 'Хамовников',
      middleName: 'Богданович',
      birthDate: new Date(1998, 8, 12),
      startStudyYear: 2018,
      faculty: 'Археология'
    },
    {
      name: 'Алексей',
      surname: 'Дегтярёв',
      middleName: 'Антонович',
      birthDate: new Date(1999, 10, 22),
      startStudyYear: 2019,
      faculty: 'Квантовая механика'
    },
    {
      name: 'Альберт',
      surname: 'Понасенков',
      middleName: 'Артурович',
      birthDate: new Date(2002, 4, 1),
      startStudyYear: 2020,
      faculty: 'Астрономия'
    },
    {
      name: 'Омар',
      surname: 'Хинди',
      middleName: 'Шилио',
      birthDate: new Date(2003, 11, 12),
      startStudyYear: 2021,
      faculty: 'Гадание на картах'
    },
  ];

  let students = defaultStudents.slice();

  const searchFullName = document.getElementById('searchFullName');
  const searchFaculty = document.getElementById('searchFaculty');
  const searchStartStudy = document.getElementById('searchStartStudy');
  const searchEndStudy = document.getElementById('searchEndStudy');

  const studentTable = document.querySelector('table');
  let studentTableBody = document.querySelector('tbody');

  const filterFullName = document.getElementById('filterFullName');
  const filterFaculty = document.getElementById('filterFaculty');
  const filterDate = document.getElementById('filterDate');
  const filterStudyAndCourse = document.getElementById('filterStudyAndCourse');

  const addStudentForm = document.getElementById('addStudentForm');

  const inputName = document.getElementById('inputName');
  const inputSurname = document.getElementById('inputSurname');
  const inputMiddleName = document.getElementById('inputMiddleName');
  const inputBirthDate = document.getElementById('inputBirthDate');
  const inputStartStudy = document.getElementById('inputStartStudy');
  const inputFaculty = document.getElementById('inputFaculty');

  searchFullName.addEventListener('input', searchFn);
  searchFaculty.addEventListener('input', searchFn);
  searchStartStudy.addEventListener('input', searchFn);
  searchEndStudy.addEventListener('input', searchFn);

  filterFullName.addEventListener('click', filterFn);
  filterFaculty.addEventListener('click', filterFn);
  filterDate.addEventListener('click', filterFn);
  filterStudyAndCourse.addEventListener('click', filterFn);

  function removeTableBody() {
    studentTableBody.remove();
    studentTableBody = document.createElement('tbody');
    studentTable.append(studentTableBody);
  };

  function searchFn() {
    if (this === searchFullName) {
      let resultsArr = [];
      let fullName = this.value;
      resultsArr = students.filter(student => (student.surname + ' ' + student.name + ' ' + student.middleName).toLowerCase().includes(fullName.toLowerCase()));
      removeTableBody();
      resultsArr.forEach(result => addToTable(result));
    } else if (this === searchFaculty) {
      let resultsArr = [];
      let faculty = this.value;
      resultsArr = students.filter(student => student.faculty.toLowerCase().includes(faculty.toLowerCase()));
      removeTableBody();
      resultsArr.forEach(result => addToTable(result));
    } else if (this === searchStartStudy) {
      let resultsArr = [];
      let startStudy = this.value;
      resultsArr = students.filter(student => student.startStudyYear === Number(startStudy));
      removeTableBody();
      resultsArr.forEach(result => addToTable(result));
    } else if (this === searchEndStudy) {
      let resultsArr = [];
      let endStudy = this.value;
      resultsArr = students.filter(student => student.startStudyYear + 4 === Number(endStudy));
      removeTableBody();
      resultsArr.forEach(result => addToTable(result));
    };

    if (this.value === '') {
      removeTableBody();
      students.forEach(student => addToTable(student));
    };
  };

  function filterFn() {
    if (this === filterFullName) {
      students.sort(byField('surname'));
      removeTableBody();
      students.forEach(student => addToTable(student));
    } else if (this === filterFaculty) {
      students.sort(byField('faculty'));
      removeTableBody();
      students.forEach(student => addToTable(student));
    } else if (this === filterDate) {
      students.sort(byField('birthDate'));
      removeTableBody();
      students.forEach(student => addToTable(student));
    } else if (this === filterStudyAndCourse) {
      students.sort(byField('startStudyYear'));
      removeTableBody();
      students.forEach(student => addToTable(student));
    };

    function byField(field) {
      return (a, b) => a[field] > b[field] ? 1 : -1;
    };
  };

  students.forEach(student => addToTable(student));

  function addToTable(student) {
    let fullName = student.surname + ' ' + student.name + ' ' + student.middleName;
    let faculty = student.faculty;
    let age = `${student.birthDate.getDate()}.${student.birthDate.getMonth() + 1}.${student.birthDate.getFullYear()} (${calculateAge(student.birthDate)})`;
    let study = `${student.startStudyYear}-${student.startStudyYear + 4} (${calculateStudy(student.startStudyYear)})`;

    let tableCellName = document.createElement('td');
    let tableCellFaculty = document.createElement('td');
    let tableCellAge = document.createElement('td');
    let tableCellStudy = document.createElement('td');
    let tableRow = document.createElement('tr');

    tableCellName.append(fullName);
    tableCellFaculty.append(faculty);
    tableCellAge.append(age);
    tableCellStudy.append(study);

    tableRow.append(tableCellName);
    tableRow.append(tableCellFaculty);
    tableRow.append(tableCellAge);
    tableRow.append(tableCellStudy);

    studentTableBody.append(tableRow);
  };

  function calculateAge(date) {
    let now = new Date();
    let born = new Date(date);
    let words = ['год', 'года', 'лет'];
    let difference = now.getTime() - born.getTime();

    difference = Math.floor(difference / 1000 / 60 / 60 / 24 / 365.25);

    function numWord(value) {
      value = Math.abs(value) % 100;
      let num = value % 10;
      if (value > 10 && value < 20) return words[2];
      if (num > 1 && num < 5) return words[1];
      if (num == 1) return words[0];
      return words[2];
    };

    return difference + ' ' + numWord(difference);
  };

  function calculateStudy(start) {
    if (start + 4 <= currentYear) {
      return 'Закончил'
    } else if (start + 4 === currentYear + 4) {
      return '1 курс'
    } else if (start + 4 === currentYear + 3) {
      return '2 курс'
    } else if (start + 4 === currentYear + 2) {
      return '3 курс'
    } else if (start + 4 === currentYear + 1) {
      return '4 курс'
    };
  };

  addStudentForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.trim();
    });
  });

  addStudentForm.addEventListener('submit', event => {
    event.preventDefault();

    let name = inputName.value;
    let surname = inputSurname.value;
    let middleName = inputMiddleName.value;
    let faculty = inputFaculty.value;
    let birthDate = new Date(inputBirthDate.valueAsDate);
    let startStudyYear = Number(inputStartStudy.value);

    defaultStudents.push({ name, surname, middleName, birthDate, startStudyYear, faculty });

    students.push({ name, surname, middleName, birthDate, startStudyYear, faculty });

    addToTable(students[students.length - 1]);

    inputName.value = '';
    inputSurname.value = '';
    inputMiddleName.value = '';
    inputBirthDate.value = '';
    inputStartStudy.value = '';
    inputFaculty.value = '';
  });
})
