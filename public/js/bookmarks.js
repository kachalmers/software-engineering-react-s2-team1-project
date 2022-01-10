import Navigation from "./navigation.js";
import WhatsHappening from "./whats-happening.js";
import Tuits from "./tuits.js";

function Bookmarks () {
  const navigation = Navigation();
  const tuits = Tuits();
  const whatsHappening = WhatsHappening();
  const output = `
  <div class="container ">
   <div class="ttr-bookmarks">
    <div class="ttr-left-column">
     ${navigation}
    </div>
    <div class="ttr-center-column">
     ${tuits}
    </div>
    <div class="ttr-right-column">
     ${whatsHappening}
    </div>
  </div>
  `;
  const root = $("#root");
  root.append(output);
}
Bookmarks();
export default Bookmarks;