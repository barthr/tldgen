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

const setResult = result => {
    clearResult()

    resultList.classList.remove("d-none")
    result.forEach(domain => {
        const li = document.createElement("h5");
        li.classList.add("list-group-item")
        li.innerText = domain;
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


