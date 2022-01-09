import {tlds} from "./tld.js";

const domainInput = document.getElementById("domain-input");
const submitButton = document.getElementById("submit");
const resultList = document.getElementById("domain-result");
const resultCount = document.getElementById("domain-count");

const cleanDomainInput = (input) => {
    return input.match(/[a-zA-Z0-9]+/g).join("").toLowerCase();
}

const findDomainNames = input => {
    if (input == null)
        return []

    input = cleanDomainInput(input)
    return tlds
        .filter(tld => input.length > tld.length)
        .filter(tld => input.endsWith(tld))
        .filter(tld => input.slice(0, -tld.length).length > 1)
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





