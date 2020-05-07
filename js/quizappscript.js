
const questions = [
	{
		question: 'Who created the whole universe?',
		options: [
			{option: 'God', value: true}, {option: 'You', value: false}, {option: 'Man', value: false}, ],
	},
	{
		question: 'Who is the president of the Federal Republic of Nigeria?',
		options: [
			{option: 'Olusegun Obasanjo', value: false}, {option: 'Dora Akuyile', value: false}, {option: 'Rtd. Gen. Muhammod Buhari', value: true}, ],
	},
	{
		question: '______ is the name of the capital of China?',
		options: [
			{option: 'Beijing', value: true}, {option: 'Hong Kong', value: false}, {option: 'Shanghai', value: false}, ],
	},
	{
		question: 'Animals with feathers are called ______?',
		options: [
			{option: 'Birds', value: true}, {option: 'Reptiles', value: false}, {option: 'Amphibians', value: false}, ],
	},
	{
		question: 'A verb that functions as a noun is a ______?',
		options: [
			{option: 'Phrase', value: false}, {option: 'Gerund', value: true}, {option: 'Idiom', value: false}, ],
	},
];

var score = 0;

function quizApp() {
	let node = document.getElementById('question_display');
	let button_node = document.getElementById('button');
	let count = 0;

	button.addEventListener("click", () => {
		let old_text = button_node.firstChild;
		if (count < questions.length) {
			let new_text = document.createTextNode('NEXT');
			button_node.replaceChild(new_text, old_text);
			count = count + 1;
			setQuestion(count);
			getScore();
		} else {
			terminate();
		}
	});
}

const setQuestion = (i) => {
	// Fetch a question from the data. Each question exists as a key-value pair.
	let question = questions[i-1];
	// Get the heading node for the display of question id(number).
	let heading_node = document.getElementById('heading');
	// Get the question text node for the display of the question text
	let question_text_node = document.getElementById("question_text");
	// Create the <div>...</div> to hold the answer options for selected question. This takes the place
	// of "Let's start" statement on the landing page.
	let question_options = document.createElement("div");
	(document.getElementById('root')).replaceChild(question_options, document.getElementById('question_options'));
	question_options.id = "question_options";
	// Now, replace the initial heading with the question id(number).
	heading_node.replaceChild(document.createTextNode("Question number " + i), heading_node.firstChild);
	// Replace the initial content of '#question_text' with fetched question.question from the data
	question_text_node.replaceChild(document.createTextNode(question.question), question_text_node.firstChild);
	// Set the options from question.options in the data
	let options = question.options;
	for (let i=0; i < options.length; i++) {
		let optionlabel = document.createElement("p");
		let radio = document.createElement("input");
		radio.type = 'radio';
		radio.name = options[i].value;

		optionlabel.appendChild(document.createTextNode(options[i].option));
		optionlabel.insertBefore(radio, optionlabel.firstChild);

		question_options.appendChild(optionlabel);
	}
}

function getScore() {
	// Set event listener on the '#question_options' node and its child nodes.
	// This get the event fired on a mouse click on any of the child nodes.
	// A function then checks to determine that the event has been fired from an <input />.
	// It goes on to determine if the <input /> with the correct answer was fired.
	// Thus, incrementing the score if so. Otherwise, score remains the same as prior to the event.
	// The function also color the background of the clicked <input />.
	let options = document.getElementById('question_options');
	options.addEventListener('click', (e) => {
		let target = e.target;
		if (target.nodeName == 'P') {
			console.log(target.textContent);
		} else if (target.nodeName == 'INPUT'){
			if (target.getAttribute('name') == 'true') {
				(target.parentNode).style.background = 'green';
				(target.parentNode).style.color = 'white';
				score = score + 1;
			} else {
				(target.parentNode).style.background = 'red';
				(target.parentNode).style.color = 'white';
			}
		}
	});
}

function terminate() {
	// Replace the '#heading' <h2>...</h2> with a new salutatory statement
	let heading_node = document.getElementById('heading');
	heading_node.replaceChild(document.createTextNode("Well done, pal!"), heading_node.firstChild);
	let question_text_node = document.getElementById("question_text");
	question_text_node.replaceChild(document.createTextNode("At the end of the quiz..."), question_text_node.firstChild);

	//Replace the then '#question_options' <div>...</div> with <p>...</p> for score statement
	let score_statement = document.createElement("p");
	score_statement.id = "score";
	(document.getElementById('root')).replaceChild(score_statement, document.getElementById('question_options'))
	score_statement.appendChild(document.createTextNode("Correct answers are "+ score + "/" + questions.length));

	// Finally, replace the button with some text
	(document.getElementById('root')).replaceChild(
		document.createTextNode("Thank you for taking the quiz"), document.getElementById('button'));
}

quizApp();
