const slides = document.getElementById ('slides');
let userName;

fetch('https://opentdb.com/api.php?amount=10')
    .then(res => res.json())
    .then(json => {
    	data = json.results

        let correctAnswer = data.map(function(item){
        	return item.correct_answer
        });
     
        let Q = data.map(function(item) {
        	return item.question
        })

        let incorrect = data.map(function(item) {
        	return item.incorrect_answers
        })

        const question1 = {
	       question: Q[0],
	       answer1: incorrect[0].slice(1,2),
	       answer2: correctAnswer[0],
	       answer3: incorrect[0].slice(0,1),
	       answer4: incorrect[0].slice(-1)
        }
        
        const question2 = {
	        question: Q[1],
	        answer1: incorrect[1].slice(1,2),
	        answer2: incorrect[1].slice(0,1),
	        answer3: correctAnswer[1],
	        answer4: incorrect[1].slice(-1)
        }

        const question3 = {
        	question: Q[2],
        	answer1: correctAnswer[2],
        	answer2: incorrect[2].slice(0,1),
            answer3: incorrect[2].slice(0,1),
            answer4: incorrect[2].slice(-1)
        }

        const question4 = {
        	question: Q[3],
        	answer1: incorrect[3].slice(1,2),
            answer2: correctAnswer[3],
	        answer3: incorrect[3].slice(0,1),
	        answer4: incorrect[3].slice(-1)
        }

        const question5 = {
        	question: Q[4],
        	answer1: incorrect[4].slice(1,2),
	        answer2: incorrect[4].slice(0,1),
	        answer3: correctAnswer[4],
	        answer4: incorrect[4].slice(-1)
        }
       
        let q = [question1,question2,question3,question4,question5];

        let questions = document.getElementById('question'); 

        let answers1 = document.getElementById ('answer1');
        let answers2 = document.getElementById ('answer2');
        let answers3 = document.getElementById ('answer3');
        let answers4 = document.getElementById ('answer4');

        let num = 0;
        let score = 0;

        let userAnswer = [0,0,0,0,0];

        const chooseButton1 = document.getElementById('choose1');
        const chooseButton2 = document.getElementById('choose2');
        const chooseButton3 = document.getElementById('choose3');
        const chooseButton4 = document.getElementById('choose4');

        let button = [chooseButton1,chooseButton2,chooseButton3,chooseButton4];

        const nextButton = document.getElementById('next');
        const previosButton = document.getElementById('previos');
        const submitButton = document.getElementById('submit');
        const startButton = document.getElementById('start');
        const restartButton = document.getElementById('restart');
        let form = document.querySelector('.form');

        nextButton.style.display = 'none';
        previosButton.style.display = 'none';
        chooseButton1.style.display = 'none';
        chooseButton2.style.display = 'none';
        chooseButton3.style.display = 'none';
        chooseButton4.style.display = 'none';
        submitButton.style.display = 'none';
        restartButton.style.display = 'none';

        startButton.addEventListener('click',() => {
	        event.preventDefault();
	        startGame();
        })

        let timer = 0;
        let name = form.elements['name'];

        form.addEventListener('submit',(event) => {
            console.log(name.value);
            userName = name.value;
            let regex =/^[A-Z]{1}[a-z]{2,10}$/;
            name.classList.remove('error'); 

            if (!regex.test(name.value)){
    	        event.preventDefault();
    	        console.log('error');
    	        name.classList.add('error');

    	        let error = document.createElement('div');
    	        error.className = 'error_block';
    	        error.style.color = 'red';
    	        error.innerHTML = 'Enter the name correctly';
    	        name.parentElement.insertBefore(error,name);
            }
        })

        function onButton() {
	        button.forEach((item) => {
		        item.removeAttribute('disabled',true);
	        });
	        answer1.style.color =  'black' ;
	        answer2.style.color =  'black' ;
	        answer3.style.color =  'black' ;
	        answer4.style.color =  'black' ;
        }

        restartButton.addEventListener ('click',() => {
	        event.preventDefault();
	        location.reload();
        })

        function startGame() {
            clearTimeout(timer);
            form.style.display = 'none';
            startButton.style.display = 'none';
	        nextButton.style.display = 'block';
            previosButton.style.display = 'block';
            chooseButton1.style.display = 'block';
            chooseButton2.style.display = 'block';
            chooseButton3.style.display = 'block';
            chooseButton4.style.display = 'block';
            submitButton.style.display = 'block';

            chooseButton1.addEventListener('click',() => {
    	        clearTimeout(timer);
	            event.preventDefault();
	            userAnswer[num] = q[num].answer1;

	            if (userAnswer[num] === correctAnswer[num]) {
                    answer1.style.color = 'Lightgreen';
	                } else {
	    	            answer1.style.color = 'red';
	            };
	            noneButton()
            })

            chooseButton2.addEventListener('click',() => {
    	        clearTimeout(timer);
	            event.preventDefault();
	            userAnswer[num] = q[num].answer2;

	            if (userAnswer[num] === correctAnswer[num]) {
                    answer2.style.color = 'Lightgreen';
	                } else {
	    	             answer2.style.color = 'red';
	            };
	            noneButton();
            });

            chooseButton3.addEventListener('click',() => {
    	        clearTimeout(timer);
	            event.preventDefault();
	            userAnswer[num] = q[num].answer3;
	 
                if (userAnswer[num] === correctAnswer[num]) {
                answer3.style.color = 'Lightgreen';
	                } else {
	    	        answer3.style.color = 'red';
	            };
	            noneButton();	
            });

            chooseButton4.addEventListener('click',() => {
    	        clearTimeout(timer);
	            event.preventDefault();
	            userAnswer[num] = q[num].answer4;
	
                if (userAnswer[num] === correctAnswer[num]) {
                    answer4.style.color = 'Lightgreen';
	                } else {
	    	            answer4.style.color = 'red';
	            };
	            noneButton();
            });


            buildQuiz =(q) => {  

                if (num === q.length) {
                num = 0;
                };
                questions.innerHTML = q[num].question;
                answers1.innerHTML = q[num].answer1;
                answers2.innerHTML = q[num].answer2; 
                answers3.innerHTML = q[num].answer3;
                answers4.innerHTML = q[num].answer4;

                timer = setTimeout(() =>{
    	        noneButton();showResults();
    	        restartButton.style.display = 'block';
    	        nextButton.style.display = 'none';
                previosButton.style.display = 'none';
                chooseButton1.style.display = 'none';
                chooseButton2.style.display = 'none';
                chooseButton3.style.display = 'none';
                chooseButton4.style.display = 'none';
                submitButton.style.display = 'none';
                questions.style.display = 'none';
                answer1.style.display = 'none';
                answer2.style.display = 'none';
                answer3.style.display = 'none';
                answer4.style.display = 'none';
                },20000);

            };

            let numSlide = 0 ;
            let newNumSlide = 0;

            nextButton.addEventListener('click',() => {
    	        clearTimeout(timer);
	            event.preventDefault();
	            num++;
	            newNumSlide=numSlide+1;
	            showSlide();
	            onButton();
            });

            previosButton.addEventListener('click',() => {
    	        clearTimeout(timer);
	            event.preventDefault();
	            newNumSlide=numSlide-1;
	            num--; 
	            showSlide();
	            noneButton();
            });

            function showSlide() {
                numSlide=newNumSlide;
	            if (numSlide === 0) {
		            previosButton.style.display = 'none';
	                } else {
		                previosButton.style.display = 'block';
	            };

                if (numSlide ===  q.length -1) {
                    nextButton.style.display = 'none';
                    submitButton.style.display = 'block';
                } else {
    	            nextButton.style.display = 'block';
    	            submitButton.style.display = 'none';
                }

	            buildQuiz(q);
            }
            showSlide();

             submitButton.addEventListener('click',() => {
	            event.preventDefault();
                showResults(); 
                restartButton.style.display = 'block'; 
                nextButton.style.display = 'none';
                previosButton.style.display = 'none';
                chooseButton1.style.display = 'none';
                chooseButton2.style.display = 'none';
                chooseButton3.style.display = 'none';
                chooseButton4.style.display = 'none';
                submitButton.style.display = 'none';
                questions.style.display = 'none';
                answer1.style.display = 'none';
                answer2.style.display = 'none';
                answer3.style.display = 'none';
                answer4.style.display = 'none';
  
            });

   
            function showResults() {
	            score = userAnswer.filter((item,num) => item == correctAnswer[num]).length;
	            let result = document.getElementById('result');
	            console.log(userName);
                result.innerHTML = (userName+', game over, your winnings,' + score);
            };

            function noneButton() {
                clearTimeout(timer);
	            button.forEach((item) => {
		            item.setAttribute('disabled',true);
	            })
            };

        };

    })    