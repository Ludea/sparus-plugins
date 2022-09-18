import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as DiscordIcon } from "./assets/discord.svg";
import { ReactComponent as TrelloIcon } from "./assets/trello.svg";

// Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";

// Tauri API
import { open } from "@tauri-apps/api/shell";

const SocialsIcons = (url: any, icons: string[]) => {
  return (
    <div>
    {
      icons.map(icon => (
        icon === "facebook" ? (
          <IconButton
            color="primary"
            aria-label="Facebook"
            size="small"
            onClick={() => open(url.facebook)}
          >
            <FacebookIcon />
          </IconButton>
        ) : (
        icon === "twitter" ? (
          <IconButton
            color="primary"
            aria-label="Twitter"
            size="small"
            onClick={() => open("https://twitter.com")}
          >
            <TwitterIcon />
          </IconButton>
        ) : (
       icon === "discord" ? (
          <IconButton
            color="primary"
            aria-label="Discord"
            size="small"
            onClick={() => open("https://discord.gg")}
          >
            <SvgIcon component={DiscordIcon} />
          </IconButton>
        ) : (
        icon === "trello" ? (
          <IconButton
            color="primary"
            aria-label="Trello"
            size="small"
            onClick={() => open("https://trello.com")}
          >
            <SvgIcon component={TrelloIcon} />
          </IconButton>
        ) : (
        icon === "youtube" ? (
          <IconButton
            aria-label="Youtube"
            size="small"
            onClick={() => open("https://www.youtube.com")}
          >
            <YouTubeIcon color="error" />
          </IconButton>
        ) : (
        icon === "email" ? (
          <IconButton
            aria-label="Mail"
            size="small"
            sx={{
              color: "white",
            }}
            onClick={() => open("")}
          >
            <EmailIcon />
          </IconButton>
        ) : (
        icon === "website" ? (
          <IconButton
            aria-label="Website"
            size="small"
            sx={{
              color: "white",
            }}
            onClick={() => open("https://google.com")}
          >
            <LanguageIcon />
          </IconButton>
        ) : null
     ))))))))}
      </div>
  );
}

export default SocialsIcons;
