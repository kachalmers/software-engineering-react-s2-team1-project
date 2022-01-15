import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";

const Tuit = ({tuit}) => {
  return(
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        <img src={`../images/${tuit['avatar-logo']}`}
             className="ttr-tuit-avatar-logo rounded-circle"/>
      </div>
      <div>
        <h2
          className="fs-5">{tuit.username} @{tuit.handle} - {tuit.published}</h2>
        {tuit.content}
        {
          tuit.youtube &&
            <TuitVideo tuit={tuit}/>
        }
        {
          tuit.image &&
          <TuitImage tuit={tuit}/>
        }
        <TuitStats tuit={tuit}/>
      </div>
    </li>
  );
}
export default Tuit;