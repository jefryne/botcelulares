(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Screenshot carousel
    $(".screenshot-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        dots: true,
        items: 1
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);


//logica para el chat bot
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', sendMessage);
function sendMessage() {
    const userMessage = messageInput.value;
    if (userMessage.trim() !== '') {
        displayMessage('Tú: ' + userMessage, 'user');
        getBotResponse(userMessage);
        messageInput.value = '';
    }
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'alert alert-primary mb-2' : 'alert alert-warning mb-2';
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userMessage) {
    console.log(userMessage);
    data = {
        "top":1,
        "question": " "+userMessage+" ",
        "includeUnstructuredSources": true,
        "confidenceScoreThreshold": 0,
        "answerSpanRequest": {
            "enable": true,
            "topAnswersWithSpan": 0,
            "confidenceScoreThreshold": 1
        },
        "filters": {
            "metadataFilter":{
                "logicalOperation": "AND"
            }
        }
    }

    url = "https://chat-bot-v1.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=chat-bot-v1&api-version=2021-10-01&deploymentName=production"
    fetch(url,{
        method: 'POST',
        headers: {
            "Ocp-Apim-Subscription-Key": "4ef77b5607554d15ab48f373dd444b6f",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data.answers[0].answer);
        const botResponse = data.answers[0].answer;
        displayMessage('Bot: ' + botResponse, 'bot');

    })
    .catch(error => {
        console.error("Error:", error);
    });
}
