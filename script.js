async function trivia() {
  const data = await fetch("https://opentdb.com/api.php?amount=10&category=18");
  const res = await data.json();
  console.log(res.results);
}
trivia();

//how to get data from api to display. ->

// res.results.forEach((element) => {
//   console.log(element.question);
// });
