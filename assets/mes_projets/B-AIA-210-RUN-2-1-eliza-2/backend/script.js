async function sendMessage() {
    let input = document.getElementById("input").value;

    if (!input) return;

    document.getElementById("chat").innerHTML +=
        "<p><b>Toi :</b> " + input + "</p>";

    let response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: input
        })
    });

    let data = await response.json();

    document.getElementById("chat").innerHTML +=
        "<p><b>Bot :</b> " + data.response + "</p>";

    document.getElementById("input").value = "";
}