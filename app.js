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
    switchState: () => {
      const form = [].slice.call(document.getElementsByTagName('form'))[0];
      const formHeadline = form.querySelector('.form-headline');
      const type = formHeadline?.dataset?.target;
      const forgotPassword = form.querySelector('.forgot-password');
      const actionButton = form.querySelector('.action-button');
      const alreadyAccount = form.querySelector('.already-account');
      const signInLink = form.querySelector('.sign-in-link');
      const labels = {
        formHeadline: {
          signIn: 'Sign In',
          signUp: 'Sign Up'
        },
        actionButton: {
          signIn: 'Login',
          signUp: 'Create Account'
        },
        alreadyAccount: {
          signIn: 'Create a new account.',
          signUp: 'Already have an account?'
        },
        signInLink: {
          signIn: 'Sign Up',
          signUp: 'Sign In'
        }
      }

      formHeadline.innerHTML = labels.formHeadline[type];
      actionButton.innerHTML = labels.actionButton[type];
      alreadyAccount.innerHTML = labels.alreadyAccount[type];
      signInLink.innerHTML = labels.signInLink[type];

      if (type === 'signUp') {
        formHeadline.dataset.target = 'signIn'; 
        forgotPassword.classList.add('opacity-0');
      } else {
        formHeadline.dataset.target = 'signUp';
        forgotPassword.classList.remove('opacity-0');
      }
    }
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
