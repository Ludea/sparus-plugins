import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        play: "Play",
        login: "Login",
        cancel: "Cancel",
        install: "Install",
        emptyLogin: "Please fill login form !",
        emptyPassword: "Please fill login form !",
        memory:
          "The minimum to play is 8GB and you have only {memory.current}GB",
        gpu: "The minimum is NVIDIA GTX 970 and you have {gpu.current}",
        update:
          "The launcher is updated, Please <Link to='' onClick={relaunch}>restart it</Link>",
      },
    },
    fr: {
      translation: {
        play: "Jouer",
        login: "Connexion",
        cancel: "Annuler",
        install: "Installer",
        emptyLogin: "Remplis ton login !",
        emptyPassword: "Remplis ton mot de passe !",
        memory:
          "Le minimum pour hoer est de 8GB et tu as seulement {memory.current}Go",
        gpu: "Le minimum est NVIDIA GTX 970 et tu as seulement {gpu.current}",
        update:
          "Le launcher est à jour, Veuillez <Link to='' onClick={relaunch}>le redemarrer</Link>",
      },
    },
  },
});

export default i18n;
