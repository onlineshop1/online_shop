const navLi = document.querySelectorAll("li");

const disableNavLi = () => {
    navLi.forEach((el) => el.classList.remove("active"));
};




const h1 = window.location.href.split("?tab=")[1];
const showContent = async (h1 = 'dashboard') => {
    document.querySelector('header h1').innerHTML = h1;
};


const activateNavLi = async () => {
    disableNavLi();
  
    const tab = window.location.href.split("?tab=")[1];
    
    if (!tab) {
        await showContent();
        document.querySelector(".dashboard").classList.add("active");
        return;
    }
    await showContent(tab);
    document.querySelector(`.${tab}`).classList.add("active");
     ShowSellers()
};

navLi.forEach((li) => {
    li.addEventListener('click', (event) => {
        const href = li.querySelector('a').getAttribute('href');
        const tab = href.split("?tab=")[1];
        showContent(tab);
        disableNavLi();
        li.classList.add("active");
    });
});
activateNavLi();

const getAllSellers = async () => {
    const res = await fetch("http://localhost:8080/sellers")
    return await res.json()
}


const ShowSellers = async () => {
    
const tab = window.location.href.split("?tab=")[1];



if(tab == 'sellers'){
    allSeller = await getAllSellers()
    console.log(allSeller.sellers)
    let studentContent = ``

    allSeller?.sellers?.forEach((d) => {
            studentContent += `<tr>
                <td>${d.id}</td>
                <td><img src="${d.image_url}" alt="Student image"></td>
                <td>${d.shop_name} </td>
                <td>+${d.phone_number}</td>
                <td>${d.birth_date}</td>
                <td>${d.created_date}</td>
                <td>${d.password}</td>
                <td>${d.role}</td>
                <td><i class="fa-regular fa-pen-to-square"></i></td>
                <td><i class="fa-solid fa-trash"></i></td>
              </tr>`;
        document.querySelector('.seller-data').innerHTML = studentContent;
      });
}
}
















// <% data.forEach(d => { %>
//     <tr>
//         <td><%= d.id %></td>
//         <td><img src="<%= d.img_url %>" alt=""></td>
//         <td><% d.shop_name %></td>
//         <td><%= d.phone_number %></td>
//         <td><%= d.birth_date %></td>
//         <td><%= d.created_date %></td>
//         <td>Password</td>
//         <td>Login</td>
//         <td><i class="fa-solid fa-pen-to-square"></i></td>
//         <td><i class="fa-solid fa-trash"></i></td>
//     </tr>
//     <% }) %>


