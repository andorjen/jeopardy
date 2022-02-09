const BASE_API_URL = "http://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

// categories is the main data structure for the app; it should eventually look like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: "4", showing: null},
//        {question: "1+1", answer: "2", showing: null}, ... 3 more clues ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null}, ...
//      ],
//    }, ...4 more categories ...
//  ]

let categories = [];
// async function getCategories() {}
// getCategoryIds();
// getCategory(11496);

/** Get NUM_CATEGORIES random categories from API.
 *
 * Returns array of category ids, e.g. [4, 12, 5, 9, 20, 1]
 */

async function getCategoryIds() {
  const res = await axios.get(
    `${BASE_API_URL}categories?count=${NUM_CATEGORIES}`
  );
  //   console.log(res.data.map((cat) => cat.id));
  return res.data.map((cat) => cat.id);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ... 3 more ...
 *   ]
 */

async function getCategory(catId) {
  const res = await axios.get(`${BASE_API_URL}category?id=${catId}`);

  const title = res.data.title;
  const clues = res.data.clues.map((clue) => {
    return { question: clue.question, answer: clue.answer, showing: null };
  });
  //   console.log({ title, clues });
  return { title, clues };
}

async function makeCategories() {
  let ids = await getCategoryIds();
  categories = await Promise.all(ids.map(id => getCategory(id)));
  console.log(categories)
}

/** Fill an HTML table with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM-QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initially, just show a "?" where the question/answer would go.)
 * <thead> --> 6, filled with category title
 * <tbody> --> filled with clues within that category
 * first add table, 
 *  <thead>
 *    <tr>
 *      <th> loop over category titles and fill with title
 * 
 *  <tbody>
 *    <tr>
 */
//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: "4", showing: null},
//        {question: "1+1", answer: "2", showing: null}, ... 3 more clues ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null}, ...
//      ],
//    }, ...4 more categories ...
//  ]
async function fillTable() {
  await makeCategories();
  let $table = $("<table>");
  $("#jeopardy-board").append($table);
  $table.addClass("jeopardy-table");

  let $thead = $("<thead>");
  let $tr = $("<tr>");
  $tr.addClass("categories");
  $table.append($thead.append($tr));
  
  for (let category of categories) {
    $th = $("<th>").text(category.title);
    $th.addClass('jeopardy-title')
    $tr.append($th);  
  }
  
  let $tbody = $("<tbody>");

  for (let row = 0; row < NUM_CLUES_PER_CAT; row++) {
    $tr = $("<tr>");
    $tr.addClass(`clues-${row}`);
    $table.append($tbody.append($tr));

    for (let col = 0; col < NUM_CATEGORIES; col++) {
      $td = $("<td>").text("?");
      $td.addClass('clue');
      $td.attr('row', row);
      $td.attr('col', col);
      $td.attr('showing', 0);
      $td.on('click', handleClick(evt));
      $tr.append($td);
    }
  }
  
  //categories[col].clues[row].question)

}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) { }

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() { }

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() { }

/** Setup game data and board:
 * - get random category Ids
 * - get data for each category
 * - call fillTable to create HTML table
 */

async function setupGameBoard() {
  await makeCategories();
  fillTable();
 }

/** Start game: show loading state, setup game board, stop loading state */

async function setupAndStart() { }

/** At start:
 *
 * - Add a click handler to your start button that will run setupAndStart
 * - Add a click handler to your board that will run handleClick
 *   when you click on a clue
 */

// ADD THOSE THINGS HERE
