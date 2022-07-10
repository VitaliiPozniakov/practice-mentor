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

leftDiv.append(titleEl, leftList, leftBtn);

function renderList() {
  const markup = books
    .map(({ title }) => {
      return `<li class = 'item'><p class = 'title'>${title}</p><button class = 'btn edit' type = 'button'>Edit</button><button class = 'btn delete' type = 'button'>Delete</button></li>`;
    })
    .join("");

  leftList.insertAdjacentHTML("beforeend", markup);

  const bookName = document.querySelectorAll(".title");
//   console.log(bookName)
  bookName.forEach((item) => item.addEventListener("click", onClick));

  const btnEditRef = document.querySelectorAll(".edit");
  console.log(btnEditRef)
  const btnDeleteRef = document.querySelectorAll(".delete");

  btnEditRef.forEach((item) => item.addEventListener("click", onBtnEditClick));
  btnDeleteRef.forEach((item) => item.addEventListener("click", onBtnDeleteClick));
}

function onBtnEditClick() {
  console.log("Edit");
}

function onBtnDeleteClick() {
  console.log("Delete");
}

renderList();

function onClick(event) {
  rightDiv.innerHTML = "";

  const chooseBook = books.find((book) => {
    return book.title === event.target.textContent;
  });

  const markup = renderPreviewMarkup(chooseBook);
  rightDiv.insertAdjacentHTML("beforeend", markup);
}

function renderPreviewMarkup(book) {
  const { title, author, img, plot } = book;

  return `
<h2>${title}</h2>
<p>${author}</p>
<img alt = 'picture' src = ${img} >
<p>${plot}</p>
        `;
}
