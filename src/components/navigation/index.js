import "./navigation.css";
import {useLocation, Link} from "react-router-dom";

function Index() {
  const location = useLocation();
  console.log(location.pathname);
  const links = [
    {label: 'Tuiter', icon: 'fa-square-t', href: 'tuiter.html', path: '/tuiter'},
    {label: 'Home', icon: 'fa-home', href: 'home.html', path: '/home'},
    {label: 'Explore', icon: 'fa-hashtag', href: 'explore.html', path: '/explore'},
    {label: 'Notifications', icon: 'fa-bell', href: 'notifications.html', path: '/notifications'},
    {label: 'Messages', icon: 'fa-envelope', href: 'messages.html', path: '/messages'},
    {label: 'Bookmarks', icon: 'fa-bookmark', href: 'bookmarks.html', path: '/bookmarks'},
    {label: 'Lists', icon: 'fa-list', href: 'lists.html', path: '/lists'},
    {label: 'Profile', icon: 'fa-user', href: 'profile.html', path: '/profile'},
    {label: 'More', icon: 'fa-circle-ellipsis', href: 'more.html', path: '/more'},
  ]
  return(
    <div class="ttr-navigation">
     <ul class="list-group">
      {
      links.map(link => {
        return(
        <li class={`list-group-item border-0 ttr-font-size-150pc text-nowrap ${location.pathname.indexOf(link.path) >= 0 ? 'fw-bold':''}`}>
          <Link to={link.path}
             className="text-decoration-none text-black">
            <i className={`fa ${link.icon} text-center`}></i>
            <span className="ttr-label">{link.label}</span>
          </Link>
        </li>
        );
      })
      }
      </ul>
     <a href="#" class="mt-3 btn btn-lg btn-primary rounded-pill w-100 fw-bold text-white">
      Tuit</a>
    </div>
  );
};

export default Index;