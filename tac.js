let questionTXT

console.log(document.getElementById('question'))

document.getElementById('submitQA').addEventListener("click", function() {
    questionTXT = document.getElementById('question');
    console.log(questionTXT)
});
