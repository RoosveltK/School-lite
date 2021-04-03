export const responsbar = () => {
  const icon_menu = document.querySelector("#icon-menu");
  const pageContentWrapper = document.getElementById("wrapper");

  icon_menu.addEventListener("click", function () {
    if (pageContentWrapper.classList.contains("toggled")) {
      pageContentWrapper.classList.remove("toggled");
    } else {
      pageContentWrapper.classList.add("toggled");
    }
  });
};

export const respons = () => {
  let mainInterface = document.getElementById("interface");
  mainInterface.style.height = `${window.innerHeight - 100}px`;

  window.onresize = function () {
    mainInterface.style.height = `${window.innerHeight - 100}px`;
  };
};
