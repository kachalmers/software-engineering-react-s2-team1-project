import './navigation.css';

function Navigation() {
  const links = [
    {label: 'Tuiter', icon: 'fa-square-t', href: 'tuiter.html'},
    {label: 'Home', icon: 'fa-home', href: 'home.html'},
    {label: 'Explore', icon: 'fa-hashtag', href: 'explore.html'},
    {label: 'Notifications', icon: 'fa-bell', href: 'notifications.html'},
    {label: 'Messages', icon: 'fa-envelope', href: 'messages.html'},
    {label: 'Bookmarks', icon: 'fa-bookmark', href: 'bookmarks.html'},
    {label: 'Lists', icon: 'fa-list', href: 'lists.html'},
    {label: 'Profile', icon: 'fa-user', href: 'profile.html'},
    {label: 'More', icon: 'fa-circle-ellipsis', href: 'more.html'},
  ]
  return(`
    <div class="ttr-navigation">
     <ul class="list-group">
      ${
      links.map(link => {
        return(`
        <li class="list-group-item border-0 ttr-font-size-150pc text-nowrap">
          <a href="${link.href}"
             class="text-decoration-none text-black">
            <i class="fa ${link.icon} text-center"></i>
            <span class="ttr-label">${link.label}</span>
          </a>
        </li>
        `);
      }).join('')  
      }
      </ul>
     <a href="#" class="mt-3 btn btn-lg btn-primary rounded-pill w-100 fw-bold text-white">
      Tuit</a>
    </div>
  `);
};

export default Navigation;