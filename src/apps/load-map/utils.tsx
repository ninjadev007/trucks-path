function appendNodeAtIndex(parentNode: Element, index: number, newNode: Element) {
    const children = parentNode.children;
    if (index >= 0 && index <= children.length) {
        if (index === children.length) {
            // If the index is the same as the length of children, simply append the new node.
            parentNode.appendChild(newNode);
        } else {
            // Otherwise, insert the new node at the specified index.
            const refNode = children[index];
            parentNode.insertBefore(newNode, refNode);
        }
    } else {
        console.error("Index out of range");
    }
}
export const loadBoardTableHeader = () => {
    console.log("loading-======")
    const tableRows = document.querySelector('table thead tr') as Element;
    console.log(tableRows)
    if (!tableRows) return
    const mapLink = tableRows.getElementsByClassName("map-link")
    if (mapLink.length > 0) return
    const newElement = document.createElement("th") as Element
    newElement.classList.add("tlant-table-cell");
    newElement.classList.add("map-link")
    var textNode = document.createTextNode("Map Link");
    newElement.appendChild(textNode)
    appendNodeAtIndex(tableRows, 2, newElement)
}

export const onBodyUpdate = () => {
    // Select the <body> element
    const body = document.querySelector('body') as Element;

    // Create a new MutationObserver
    const observer = new MutationObserver(function (mutationsList, observer) {
        // Loop through each mutation
        for (let mutation of mutationsList) {
            // Check if nodes were added or removed
            if (mutation.type === 'childList') {
                console.log('Nodes inside <body> were added or removed.');
                // Your code to handle the update here
            }
        }
    });

    // Configuration of the observer
    const config = { childList: true, subtree: true };

    // Start observing the <body> element
    observer.observe(body, config);

}