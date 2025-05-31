function sendMail(event){﻿
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("https://formspree.io/f/mgeggbbb", {
        method: "POST",
        body: new FormData(event.target),
        headers: {
            'Accept': 'application/json'
        }
    }).then(() => {
        window.location.href = "./kontakt_gesendet.html";
    }).catch((error) => {
        console.log(error);
    });
}