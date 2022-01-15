import tuits from "./tuits-data.js";

function Tuits() {
 return(`
<ul class="ttr-tuits list-group">
 ${
   tuits.map(tuit => {
     return(`
       <li class="p-2 ttr-tuit list-group-item d-flex">
        <div class="pe-2">
         <img src="../images/${tuit['avatar-logo']}"
              class="ttr-tuit-avatar-logo rounded-circle"/>
        </div>
        <div>
         <h2 class="fs-5">${tuit.username} @${tuit.handle} - ${tuit.published}</h2>
         ${tuit.content}
         ${
           tuit.youtube ? `
           <div class="ttr-responsive-video ttr-rounded-15px position-relative overflow-hidden w-100 mt-2">
             <iframe width="560"
                     height="315" src="${tuit.youtube}"
                     title="YouTube video player"
                     frameborder="0"
                     class="position-absolute top-0 w-100 h-100"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowfullscreen></iframe>
            </div>
        `: ''
          }
         
         ${
           tuit.image ? `
             <div class="position-relative">
              <img src="../images/${tuit.image}"
                   class="mt-2 w-100 ttr-rounded-15px"/>
              ${
                tuit['image-overlay'] ? `
                  <span class="fa-2x text-white fw-bold bottom-0 ttr-tuit-image-overlay position-absolute">
                      ${tuit['image-overlay']}
                  </span>
                `: ''
              }
             </div>
           `: ''
          }
         <div class="row mt-2">
          <div class="col">
           <i class="far fa-message"></i>
           ${tuit.stats.replies}
          </div>
          <div class="col">
           <i class="far fa-retweet"></i>
           ${tuit.stats.retuits}
          </div>
          <div class="col">
           <i class="far fa-heart"></i>
           ${tuit.stats.likes}
          </div>
          <div class="col">
           <i class="far fa-inbox-out"></i>
          </div>
         </div>
        </div>
       </li>
     `);
   }).join('')
 }
 </ul>
    `);
}
export default Tuits;