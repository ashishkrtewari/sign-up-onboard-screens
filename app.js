(function () {
  window.app = {
    openDialog: (event, hash) => {
      const dialog = document.getElementById("dialog");
      fetch(`./${event?.currentTarget?.dataset?.target || hash}.html`)
        .then((response) => response.text())
        .then((data) => {
          dialog.innerHTML = data;
          dialog.classList.remove("opacity-0");
        });
    },
    hideDialog: () => {
      const dialog = document.getElementById("dialog");
      dialog.classList.add("opacity-0");
      dialog.innerHTML = null;
    },
  };
  document.addEventListener("DOMContentLoaded", () => {
    const pageTargets = [].slice.call(
      document.getElementsByClassName("page-target")
    );
    pageTargets.forEach((element) => {
      element.addEventListener("click", app.openDialog);
    });
    if (window.location.hash) {
      if (window.location.hash.indexOf('sign-up') > -1) {
        app.openDialog(null, window.location.hash.substr(1));
      }
    }
  });
})();
