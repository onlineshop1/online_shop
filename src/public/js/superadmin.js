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
    ShowSellers();
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
    const res = await fetch("http://localhost:8080/sellers");
    return await res.json();
}

const deleteSeller = async (id) => {
    const res = await fetch(`http://localhost:8080/Sellers/delete/${id}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        console.log(id)
        ShowSellers();
    } else {
        console.error("Failed to delete the seller");
    }
}



const updateSeller = async (id, updatedData) => {
    const res = await fetch(`http://localhost:8080/sellers/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });

    if (!res.ok) {
        console.error("Failed to update the seller");
    }
};


let sellerToDeleteId = null;

let sellerToEditId = null;

const ShowSellers = async () => {
    const tab = window.location.href.split("?tab=")[1];

    if (tab == 'sellers') {
        const allSellers = await getAllSellers();
        let sellerContent = `
            <thead>
                <tr>
                    <th>№</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Birthday</th>
                    <th>Created date</th>
                    <th>Password</th>
                    <th>Username</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
        `;

        allSellers?.sellers?.forEach((d) => {
            sellerContent += `
                <tr>
                    <td>${d.id}</td>
                    <td><img src="${d.image_url}" alt="Seller image"></td>
                    <td>${d.shop_name}</td>
                    <td>+${d.phone_number}</td>
                    <td>${d.birth_date}</td>
                    <td>${d.created_date}</td>
                    <td>${d.password}</td>
                    <td>${d.role}</td>
                    <td><i class="fa-regular fa-pen-to-square" data-id="${d.id}"></i></td>
                    <td><i class="fa-solid fa-trash" data-id="${d.id}"></i></td>
                </tr>
            `;
        });

        sellerContent += `</tbody>`;
        document.querySelector('.seller-data').innerHTML = sellerContent;

        // Add event listeners to edit icons
        document.querySelectorAll('.fa-pen-to-square').forEach(icon => {
            icon.addEventListener('click', (event) => {
                sellerToEditId = event.target.getAttribute('data-id');
                const seller = allSellers.sellers.find(s => s.id == sellerToEditId);
                document.getElementById('editPassword').value = seller.password;
                document.getElementById('editModal').style.display = 'block';
            });
        });

        // Add event listeners to delete icons
        document.querySelectorAll('.fa-trash').forEach(icon => {
            icon.addEventListener('click', (event) => {
                sellerToDeleteId = event.target.getAttribute('data-id');
                document.getElementById('deleteModal').style.display = 'block';
            });
        });
    }
}
document.getElementById('editSellerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const newPassword = document.getElementById('editPassword').value;

    if (sellerToEditId) {
        await updateSeller(sellerToEditId, { password: newPassword });
        sellerToEditId = null;
        document.getElementById('editModal').style.display = 'none';
        ShowSellers(); // Refresh the seller list
    }
});

document.getElementById('cancelEdit').addEventListener('click', () => {
    sellerToEditId = null;
    document.getElementById('editModal').style.display = 'none';
});


document.getElementById('confirmDelete').addEventListener('click', async () => {
    if (sellerToDeleteId) {
        await deleteSeller(sellerToDeleteId);
        sellerToDeleteId = null;
        document.getElementById('deleteModal').style.display = 'none';
    }
});

document.getElementById('cancelDelete').addEventListener('click', () => {
    sellerToDeleteId = null;
    document.getElementById('deleteModal').style.display = 'none';
});
