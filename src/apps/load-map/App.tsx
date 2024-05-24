import { useEffect } from "react"
import { onBodyUpdate } from "./utils"
import { loadBoardTableHeader } from "./utils"
import { addTableUpdateListner } from './utils'
import { appendNodeAtIndex } from './utils'
import { apiKey } from "../../utils"
import axios from 'axios'

export const App = () => {
  const onMapLinkClick = async (e: Event) => {
    // ===== getting the locations =====
    const target = e.target as Element
    if (!target) return
    var childrens = target.parentElement?.parentElement?.children
    if (!childrens) return
    const pickUp = childrens[1]
    const dropOff = childrens[4] as Element
    if (!pickUp || !dropOff) return
    const pickupText = pickUp.children?.[0]?.innerHTML
    const dropText = dropOff.children?.[0]?.innerHTML

    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(pickupText)}&key=${apiKey}`)
      const pickup_result = response.data.results[0]['geometry']['location']
      const drop_response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(dropText)}&key=${apiKey}`)
      const drop_result = drop_response.data.results[0]['geometry']['location']
      // ===== geocoding api to get lat and lng (MOCK) =====
      const drop = drop_result
      const pick = pickup_result 
      loadMap({ drop: drop, pick: pick })
    } catch (e) {
      console.log(e)
      return
    }
  }
  const loadMap = ({ drop, pick }: { drop: { lat: number, lng: number }, pick: { lat: number, lng: number } }) => {
    // ===== creating node to append map =====
    const map_container = document.getElementsByClassName("index-module-warp-YwZb-")
    if (!map_container) return
    if (!map_container[0]) return
    const map_container_single = map_container[0]
    if (document.getElementById("ext-map")) {
      document.getElementById("ext-map")?.remove()
    }
    const div = document.createElement("div")
    div.id = "ext-map"
    div.style.width = "100%";
    div.style.height = "400px";
    div.style.backgroundColor = "purple"
    div.style.marginTop = "10px"
    div.style.marginBottom = "10px"
    appendNodeAtIndex(map_container_single, 2, div)

    // ===== appending map =====
    var iframe = document.createElement('iframe');
    iframe.src = `http://localhost:8080/?drop_latitude=${drop.lat}&drop_longitude=${drop.lng}&pick_latitude=${pick.lat}&pick_longitude=${pick.lng}`;
    iframe.width = '100%';
    iframe.height = '400px';
    iframe.style.border = 'none';
    document.getElementById("ext-map")?.appendChild(iframe)
  }
  const onTableDataLoaded = (nodes: NodeList) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i] as Element
      if (node.classList?.contains("tlant-table-placeholder")) return
      const tableColumns = node.childNodes as unknown as Element[]
      if (!tableColumns) return

      // ===== creating td =====
      const newElement = document.createElement("td") as Element
      const newElementDiv = document.createElement("div") as any
      var textNode = document.createTextNode("Map Link");
      newElementDiv.appendChild(textNode)
      newElementDiv.onclick = onMapLinkClick
      newElement.appendChild(newElementDiv)
      appendNodeAtIndex(node, 8, newElement)
    }

  }
  useEffect(() => {
    onBodyUpdate(() => {
      loadBoardTableHeader()
      addTableUpdateListner(onTableDataLoaded)
    })
  }, [])
  return (
    <div></div>
  )
}

export default App