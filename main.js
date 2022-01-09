import {tlds} from './tld.js';

const cleanDomainInput = (input) => {
    return input.match(/[a-zA-Z0-9]+/g).join("").toLowerCase();
}

const findDomainNames = input => {
    input = cleanDomainInput(input)
    return tlds
        .filter(tld => input.endsWith(tld))
        .map(tld => input.slice(0, -tld.length) + "." + tld)
}

const setResult = result => {
    document.getElementById("result").classList.remove("d-none")

    const list = document.getElementById("domain-result");
    result.forEach(domain => {
        const li = document.createElement("h5");
        li.classList.add("list-group-item")
        li.innerText = domain;
        list.appendChild(li);
    });

    const count = document.getElementById("domain-count");
    count.innerText = `Found ${result.length} ${result.length === 1 ? "domain" : "domains"}`;
};


const domain = new URLSearchParams(window.location.search).get("domain");
if (domain != null) {
    // set input field to be the domain
    document.getElementsByName("domain")[0].value = domain;
    // set result
    setResult(findDomainNames(domain))
}




