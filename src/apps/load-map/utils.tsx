
export const appendNodeAtIndex = (parentNode: Element, index: number, newNode: Element) => {
    if (!parentNode) return
    if (!parentNode.children) return
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
    const tableRows = document.querySelector('table thead tr') as Element;
    if (!tableRows) return
    const mapLink = tableRows.getElementsByClassName("map-link")
    if (mapLink.length > 0) return
    const newElement = document.createElement("th") as Element
    newElement.classList.add("tlant-table-cell");
    newElement.classList.add("map-link")
    var textNode = document.createTextNode("Map Link");
    newElement.appendChild(textNode)
    appendNodeAtIndex(tableRows, 8, newElement)
}

export const onBodyUpdate = (callback: any) => {
    const body = document.querySelector('body') as Element;
    const observer = new MutationObserver(function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                callback()
            }
        }
    });
    const config = { childList: true, subtree: true };
    observer.observe(body, config);
}
export const addTableUpdateListner = (callback: any) => {
    const tableContainer = document.querySelector('table tbody') as Element;
    if (!tableContainer) return
    if (tableContainer.classList.contains('listner-added')) return
    tableContainer.classList.add('listner-added')
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Data has been loaded into the table
                callback(mutation.addedNodes);
            }
        }
    });
    // Observer configuration: watch for child nodes being added or removed
    const config = { childList: true, subtree: true };
    observer.observe(tableContainer, config);
}