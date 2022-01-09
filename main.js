import {tlds} from './tld.js';

const cleanDomainInput = (input) => {
    return input.match(/[a-zA-Z0-9]+/g).join("").toLowerCase();
}

const findDomainNames = input => {
    input = cleanDomainInput(input)
    const results = []
    for (let i = 0; i < input.length; i++) {
        const tld = "." + input.slice(i + 1, input.length)

        if (tlds.find(t => t === tld)) {
            const possibleName = input.slice(0, i + 1) + tld
            results.push(possibleName)
        }
    }
    return results;
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




