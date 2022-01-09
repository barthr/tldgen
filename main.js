import {tlds} from "./tld.js";

const domainInput = document.getElementById("domain-input");
const submitButton = document.getElementById("submit");
const resultList = document.getElementById("domain-result");
const resultCount = document.getElementById("domain-count");

const cleanDomainInput = (input) => {
    return input.match(/[a-zA-Z0-9]+/g).join("").toLowerCase();
}

const validDomain = (input, tld) => {
    return input.length > tld.length
        && input.endsWith(tld)
        && input.slice(0, -tld.length).length > 1
}

const findDomainNames = input => {
    if (input == null)
        return []

    input = cleanDomainInput(input)
    return tlds
        .filter(tld => validDomain(input, tld))
        .map(tld => input.slice(0, -tld.length) + "." + tld)
}

const domainResultCard = (url) => {
    return `
    <div class="d-flex">
        <div class="flex-grow-1 fw-bold font-size-lg">${url}</div>
        <a class="text-decoration-none"
           href="https://domains.google.com/registrar/search?searchTerm=${url}">Check availability
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                <path fill-rule="evenodd"
                      d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
            </svg>
        </a>
    </div>
    `
}

const setResult = result => {
    clearResult()

    resultList.classList.remove("d-none")
    result.forEach(domain => {
        const li = document.createElement("div");
        li.classList.add("list-group-item", "py-2")
        li.innerHTML = domainResultCard(domain)
        resultList.appendChild(li);
    });

    resultCount.innerText = `Found ${result.length} ${result.length === 1 ? "domain" : "domains"}`
};

const clearResult = () => {
    resultList.classList.add("d-none")
    resultList.innerHTML = "";
    resultCount.innerText = "";
}

const handleInputEvent = () => {
    setResult(findDomainNames(domainInput.value))
}

submitButton.addEventListener("click", handleInputEvent)
domainInput.addEventListener("keydown", ev => {
    if (ev.key === "Enter") handleInputEvent()
})

const domain = new URLSearchParams(window.location.search).get("domain");
if (domain != null) {
    domainInput.value = domain;
    handleInputEvent();
}

document.querySelectorAll("[data-url]").forEach(el => {
    console.log(el)
    el.setAttribute("href", `?domain=${el.getAttribute("data-url")}`)
});


