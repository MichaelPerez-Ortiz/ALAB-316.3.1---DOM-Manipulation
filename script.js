
// Henry Garcia, Ihor Haidukov, Michael Perez-Ortiz, Saranya Muthaiyan, Ali Hussain
// LAB 316.1.1


// const menuLinks = [
//     { text: 'about', href: '/about' },
//     { text: 'catalog', href: '/catalog' },
//     { text: 'orders', href: '/orders' },
//     { text: 'account', href: '/account' },
//   ];

// Menu data structure
const menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
];

// Part 1: Getting Started
const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add("flex-ctr");

// Part 2: Creating a Menu Bar
const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

// Part 3: Adding Menu Buttons
menuLinks.forEach(arrayEl => {
    const anchorEl = document.createElement("a");
    anchorEl.setAttribute("href", arrayEl.href);
    anchorEl.textContent = arrayEl.text;
    topMenuEl.appendChild(anchorEl);
});


//New part 3 calling submenu
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

//Creating submenu
function buildSubmenu(subLinks) {
    subMenuEl.innerHTML = '';
    subLinks.forEach(link => {
        const anchorEl = document.createElement('a');
        anchorEl.setAttribute('href', link.href);
        anchorEl.textContent = link.text;
        subMenuEl.appendChild(anchorEl);
    });
}

//part 4

const topMenuLinks = document.querySelectorAll("#top-menu a");//1

topMenuEl.addEventListener("click", (event) => {//2
    event.preventDefault();//2-1
    if (!event.target.matches("a")) {//2-2
        return;
    }
    
    // console.log(event.target.textContent);//2-3

    const clickedLink = menuLinks.find(link => link.text === event.target.textContent);
   
    if (event.target.classList.contains('active')) {
        event.target.classList.remove('active');//
        subMenuEl.style.top = '0';
        return;
    }
    
    topMenuLinks.forEach(el => {
        el.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (clickedLink && clickedLink.subLinks) {
        subMenuEl.style.top = '100%';
        buildSubmenu(clickedLink.subLinks);
    } else {
        subMenuEl.style.top = '0';
        mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
    }
});

//part 5 adding submenu interactions
subMenuEl.addEventListener('click', (event) => {
    event.preventDefault();
    
    if (!event.target.matches('a')) {
        return;
    }
    
    console.log(event.target.textContent);
    
    subMenuEl.style.top = '0';
    topMenuLinks.forEach(el => {
        el.classList.remove('active');
    });
    
    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});