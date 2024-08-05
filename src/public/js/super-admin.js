const navEls = document.querySelectorAll("li");

const disableNavEl = () => {
  navEls.forEach((el) => el.classList.remove("active"));
};

const showContent = async (tabName = "dashboard") => {
  const headerTitle = document.querySelector("header h1");
  headerTitle.textContent = tabName;

  if(tabName == "customers"){
    await showCustomersContent()
  }

  showDashboardContent();
};

function showDashboardContent() {
  let content = `<ul class="main-statistics">
          <li>
            <span><i style="font-size: 50px" class="fa-solid fa-people-group"></i></span>
            <span>100 ta</span>
          </li>
          <li>
            <span><i style="font-size: 50px" class="fa-solid fa-shop"></i></span>
            <span>100 ta</span>
          </li>
          <li>
            <span><i style="font-size: 50px" class="fa-brands fa-product-hunt"></i></span>
            <span>100 ta</span>
          </li>
          <li>
            <span><i style="font-size: 50px" class="fa-solid fa-user-tie"></i></span>
            <span>10 ta</span>
          </li>
        </ul>`;

  document.querySelector(".main-content").innerHTML = content;
}

async function showCustomersContent() {
  const res = await fetch("http://localhost:8080/customers");
  const data = await res.json();
  console.log(data, "data");
}

const activateNavEl = async () => {
  disableNavEl();

  const tab = window.location.href.split("?tab=")[1];
  if (!tab) {
    await showContent();
    document.querySelector(".dashboard").classList.add("active");
    return;
  }

  await showContent(tab);
  document.querySelector(`.${tab}`).classList.add("active");
};

await activateNavEl();