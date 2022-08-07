const books = [
  {
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
];

if (JSON.parse(localStorage.getItem("books")) === null) {
  localStorage.setItem("books", JSON.stringify(books));
}

// const choosedBook = null

const rootEl = document.querySelector("#root");

const leftDiv = document.createElement("div");
const rightDiv = document.createElement("div");

rootEl.append(leftDiv, rightDiv);

leftDiv.classList.add("div-left");
rightDiv.classList.add("div-right");

const titleEl = document.createElement("h1");
titleEl.textContent = "Library";
titleEl.classList.add("title-left");

const leftList = document.createElement("ul");
leftList.classList.add("list");
const leftBtn = document.createElement("button");
leftBtn.textContent = "Add";
leftBtn.classList.add("btn-add");

leftDiv.append(titleEl, leftList, leftBtn);

const addBtnRef = document.querySelector(".btn-add");

addBtnRef.addEventListener("click", onBtnAddClick);

function renderList() {
  leftList.innerHTML = "";
  const parsedBooks = JSON.parse(localStorage.getItem("books"));

  const markup = parsedBooks
    .map(({ title, id }) => {
      return `<li id=${id} class = 'item'><p class = 'title'>${title}</p><button class = 'btn edit' type = 'button'>Edit</button><button class = 'btn delete' type = 'button'>Delete</button></li>`;
    })
    .join("");

  leftList.insertAdjacentHTML("beforeend", markup);

  const bookName = document.querySelectorAll(".title");
  //   console.log(bookName)
  bookName.forEach((item) => item.addEventListener("click", onClick));

  const btnEditRef = document.querySelectorAll(".edit");
  // console.log(btnEditRef)
  const btnDeleteRef = document.querySelectorAll(".delete");

  btnEditRef.forEach((item) => item.addEventListener("click", onBtnEditClick));
  btnDeleteRef.forEach((item) =>
    item.addEventListener("click", onBtnDeleteClick)
  );
  
}

function onBtnDeleteClick(evt) {
  // console.log(evt.target.parentNode.id)
  const parsedBooks = JSON.parse(localStorage.getItem("books"));
  const afterDeleteBooks = parsedBooks.filter(
    (book) => book.id !== evt.target.parentNode.id
  );

  localStorage.setItem("books", JSON.stringify(afterDeleteBooks));

  leftList.innerHTML = "";

  renderList();

  if (document.querySelector("[data-number]") !== null) {
    const previewId = document.querySelector("[data-number]").dataset.number;
    if (evt.target.parentNode.id === previewId) {
      rightDiv.innerHTML = "";
    }
  }
}

renderList();

function onClick(event) {
  rightDiv.innerHTML = "";
  const books = JSON.parse(localStorage.getItem("books"));
  // console.log(books)f
  const chooseBook = books.find((book) => {
    return book.title === event.target.textContent;
  });

  const markup = renderPreviewMarkup(chooseBook);
  rightDiv.insertAdjacentHTML("beforeend", markup);
}

function renderPreviewMarkup(book) {
  const { title, author, img, plot, id } = book;

  return `
  <div data-number=${id}>
<h2>${title}</h2>
<p>${author}</p>
<img alt = 'picture' src = ${img} >
<p>${plot}</p>
</div>
        `;
}

function createFormMarkup({ title, author, img, plot }) {
  return `
  <form>
  <label> Title
  <input type='text' name='title' value='${title}' /> 
  </label>
  <label> Author
  <input type='text' name='author' value='${author}' /> 
  </label>
  <label> Image
  <input type='text' name='img' value='${img}'/> 
  </label>
  <label> Plot
  <input type='text' name='plot' value='${plot}'/> 
  </label>
  <button type='button' class='btn-save'>Save</button>
  </form>
  `;
}

function onBtnEditClick(event) {
  const books = JSON.parse(localStorage.getItem("books"));
  // console.log(books)
  const chooseBook = books.find((book) => {
    return book.id === event.target.parentNode.id;
  });
  // console.log(chooseBook)

  rightDiv.insertAdjacentHTML("beforeend", createFormMarkup(chooseBook));

  fillObject(chooseBook);

  const saveBtnRef = document.querySelector(".btn-save");
  saveBtnRef.addEventListener("click", onSaveBtnClick);
  function onSaveBtnClick(evt) {
    const index = books.findIndex((book) => {
      //    console.log(book.id)
      // console.log(chooseBook.id);
      return book.id === chooseBook.id;
    });
    books[index] = chooseBook;
    localStorage.setItem("books", JSON.stringify(books));


    renderList();
    rightDiv.innerHTML = "";
    rightDiv.insertAdjacentHTML("beforeend", renderPreviewMarkup(chooseBook));
  }
}

function onBtnAddClick(evt) {
  const newBook = {
    id: `${Date.now()}`,
  };
  rightDiv.innerHTML = createFormMarkup();
  fillObject(newBook);

  const saveBtnRef = document.querySelector(".btn-save");
  saveBtnRef.addEventListener("click", onSaveBtnClick);
  function onSaveBtnClick(evt) {
    // console.log(newBook)
    const books = JSON.parse(localStorage.getItem("books"));

    const valuesOfBook = Object.values(newBook);

    if (valuesOfBook.length < 5) {
      alert("please enter all fields");
      return;
    }

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    // console.log(leftList)
    // console.log(renderList())
    leftList.innerHTML = "";
    renderList();

    rightDiv.innerHTML = "";
    rightDiv.insertAdjacentHTML("beforeend", renderPreviewMarkup(newBook));

    // localStorage.setItem('books', [... JSON.parse(localStorage.getItem('books')), newBook ] )
  }
}

function fillObject(book) {
  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) =>
    input.addEventListener("change", onChangeHandler)
  );

  function onChangeHandler(evt) {
    book[evt.target.name] = evt.target.value;
  }
}
