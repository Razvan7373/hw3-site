const form = document.getElementById("project-form");
const tableBody = document.querySelector("#projects-table tbody");

const fields = {
    name: { input: document.getElementById("proj-name"), error: document.getElementById("err-name") },
    desc: { input: document.getElementById("proj-desc"), error: document.getElementById("err-desc") },
    url: { input: document.getElementById("proj-url"), error: document.getElementById("err-url") },
    tech: { input: document.getElementById("proj-tech"), error: document.getElementById("err-tech") },
    img: { input: document.getElementById("proj-img"), error: document.getElementById("err-img") },
    date: { input: document.getElementById("proj-date"), error: document.getElementById("err-date") }
};

function validateField(field, condition, message) {
    if (condition) {
        field.input.classList.remove("invalid");
        field.input.setAttribute("aria-invalid", "false");
        field.error.textContent = "";
        return true;
    } else {
        field.input.classList.add("invalid");
        field.input.setAttribute("aria-invalid", "true");
        field.error.textContent = message;
        return false;
    }
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function checkFormValidity() {
    let isValid = true;

    if (!validateField(fields.name, fields.name.input.value.trim().length >= 3, "Numele proiectului trebuie să aibă minimum 3 caractere.")) {
        isValid = false;
    }
    if (!validateField(fields.desc, fields.desc.input.value.trim().length >= 10, "Descrierea trebuie să aibă minimum 10 caractere.")) {
        isValid = false;
    }
    if (!validateField(fields.url, isValidURL(fields.url.input.value.trim()), "Introduceți un URL valid complet (ex: https://github.com).")) {
        isValid = false;
    }
    if (!validateField(fields.tech, fields.tech.input.value !== "", "Selectați o tehnologie principală din listă.")) {
        isValid = false;
    }
    if (!validateField(fields.img, isValidURL(fields.img.input.value.trim()), "Introduceți un URL valid pentru imaginea miniatură.")) {
        isValid = false;
    }
    if (!validateField(fields.date, fields.date.input.value !== "", "Vă rugăm să selectați o dată validă.")) {
        isValid = false;
    }

    return isValid;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!checkFormValidity()) {
        return;
    }

    const row = document.createElement("tr");

    const tdImg = document.createElement("td");
    const img = document.createElement("img");
    img.src = fields.img.input.value.trim();
    img.alt = `Thumbnail ${fields.name.input.value.trim()}`;
    img.classList.add("table-thumb");
    img.setAttribute("loading", "lazy");
    tdImg.appendChild(img);

    const tdName = document.createElement("td");
    const strongName = document.createElement("strong");
    strongName.textContent = fields.name.input.value.trim();
    tdName.appendChild(strongName);

    const tdDesc = document.createElement("td");
    tdDesc.textContent = fields.desc.input.value.trim();

    const tdTech = document.createElement("td");
    tdTech.textContent = fields.tech.input.value;

    const tdUrl = document.createElement("td");
    const link = document.createElement("a");
    link.href = fields.url.input.value.trim();
    link.textContent = "Deschide Pagina";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    tdUrl.appendChild(link);

    const tdDate = document.createElement("td");
    tdDate.textContent = fields.date.input.value;

    row.appendChild(tdImg);
    row.appendChild(tdName);
    row.appendChild(tdDesc);
    row.appendChild(tdTech);
    row.appendChild(tdUrl);
    row.appendChild(tdDate);

    tableBody.appendChild(row);

    form.reset();
    clearErrors();
});

function clearErrors() {
    Object.keys(fields).forEach(key => {
        fields[key].input.classList.remove("invalid");
        fields[key].input.setAttribute("aria-invalid", "false");
        fields[key].error.textContent = "";
    });
}

form.addEventListener("reset", function() {
    setTimeout(clearErrors, 10);
});