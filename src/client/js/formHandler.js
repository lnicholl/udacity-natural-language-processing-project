function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    document.getElementById('results').innerHTML = formText;
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/aylienapi',
    {
        method: 'POST',
        body: JSON.stringify({formText}),
        headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = `Polarity: ${res.polarity}, Subjectivity: ${res.subjectivity}`   
    }).catch(error => console.log(error));
}

export { handleSubmit }
