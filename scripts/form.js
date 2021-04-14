export const form = () => {
  const inputs = [...document.querySelectorAll(".js-input")];

  inputs.forEach((inp) => {
    inp.onfocus = function () {
      const label = document.querySelector(`#label-${inp.id}`);

      label.classList.add("form-label-focused");
      label.classList.add("form-label-focused-color");
      inp.classList.add("form-label-focused-color");
    };

    inp.onblur = function () {
      const label = document.querySelector(`#label-${inp.id}`);

      label.classList.remove("form-label-focused-color");

      if (inp.value.length === 0) {
        label.classList.remove("form-label-focused");
      }
    };
  });
};

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
