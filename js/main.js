document.addEventListener("DOMContentLoaded", init);
let pages = [];
pages = document.querySelectorAll(".page");

function toggleSwitch() {
    pages[0].classList.toggle("toggle");
    pages[1].classList.toggle("toggle");
}


function init() {
    document.querySelector("#btnBack").addEventListener("click", toggleSwitch);
    document.querySelector("#btnSend").addEventListener("click", generate);

    document.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
            generate();
        }

    });




    function error() {
        let dig = document.querySelector("#digits");
        let max = document.querySelector("#max");
        if (dig.value <= 0) {
            alert("Please enter a value for 'number of digits'.\nNegative numbers are not accepted.");
            dig.focus();
        } else if (dig.value > 10) {
            alert("The maximum value is 10. Please check the 'number of digits'");
            dig.focus();
        } else if (max.value <= 0) {
            alert("Range must be higher than 0 and lower than 100.");
            max.focus();
        } else if (max.value - dig.value < 0) {
            alert("Lotterys will not accept any duplicates.\nTherefore, your range must be higher than 'number of digits'.");
            max.focus();
        } else if (max.value > 99) {
            alert("The highest range is 99.\nAny number from 0-99!.");
            max.focus();
        } else {
            toggleSwitch();
        }
        return;
    }

    function generate() {
        console.log(document.querySelector("#digits").value);
        error();
        let digits = document.querySelector("#digits").value;
        let max = document.querySelector("#max").value;
        let form = new FormData();
        form.append("digits", digits);
        form.append("max", max);
        let request = new Request("https://davidst.edumedia.ca/mad9014/nums.php", {
            method: "POST",
            mode: "cors",
            body: form
        });

        fetch(request)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                let ul = document.querySelector(".num_list");
                ul.textContent = "";
                let numbers = data.numbers;
                for (let i in numbers) {
                    let li = document.createElement("li");
                    li.textContent = numbers[i];
                    ul.appendChild(li);
                }
                console.log(data);
            });
    }
}
