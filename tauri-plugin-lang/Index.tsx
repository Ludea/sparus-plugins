import { ReactComponent as US } from "assets/flags/us.svg";
import { ReactComponent as FR } from "assets/flags/fr.svg";

// i18n
import { useTranslation, Trans } from "react-i18next";
import "i18n";

  const lang = useContext(LangContext);

  const { i18n } = useTranslation();

useEffect(()=> {
    if (lang === "enUS") {
      setFlagSelected("en-US");
    } else {
     setFlagSelected(lang.substring(0, 2) + "-" + lang.substring(3,5));
       }
  }, [lang]);

const setlang = (code: string) => {
    switch (code) {
      case "en-US":
        i18n.changeLanguage("en-US");
        break;
      case "fr-FR":
        i18n.changeLanguage("fr");
        break;
      default:
        i18n.changeLanguage("en");
    }
    Save("lang", code);
    setFlagSelected(code);
  };

          <Select
            id="flags"
            value={flagSelected}
            label="Flags"
            MenuProps={{
              anchorOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
            }}
          >
            <MenuItem value="en-US" onClick={() => setlang("en-US")}>
              <US width="30" height="30" />
            </MenuItem>
            <MenuItem value="fr-FR" onClick={() => setlang("fr-FR")}>
              <FR width="30" height="30" />
            </MenuItem>
          </Select>
