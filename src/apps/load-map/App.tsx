import { useEffect, useState } from "react"
import { onBodyUpdate } from "./utils"
import { loadBoardTableHeader } from "./utils"

function App() {
  const onTableDataLoaded = (nodes: NodeList) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const tableColumns = node.childNodes as unknown as Element[]
      tableColumns[0].innerHTML = "dsd"
    }

  }
  const checkLoadedTable = () => {
    // setIsAlreadyTriger(false)
    console.log("checking loaded table")
  }
  useEffect(() => {
    onBodyUpdate()
    const asyncHandler = async () => {
      const tableContainer = document.querySelector('table tbody');
      if (!tableContainer) return
      loadBoardTableHeader()
      const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Data has been loaded into the table
            onTableDataLoaded(mutation.addedNodes);
          }
        }
      });
      // Observer configuration: watch for child nodes being added or removed
      const config = { childList: true, subtree: true };
      // Start observing the table element
      observer.observe(tableContainer, config);
    }
    setTimeout(asyncHandler, 10000)
  }, [])
  return (
    <div></div>
  )
}

export default App