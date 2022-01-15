import tuits from "./tuits-data.json";
import './tuits.css';
import Tuit from "./tuit";

function Tuits() {
 return(
<ul class="ttr-tuits list-group">
 {
   tuits.map(tuit => {
     return(
       <Tuit tuit={tuit}/>
     );
   })
 }
</ul>
    );
}
export default Tuits;