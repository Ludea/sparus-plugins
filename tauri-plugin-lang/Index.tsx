import { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";

// Tauri API
import { getClient, HttpVerb } from "@tauri-apps/api/http";

const httpMethod: HttpVerb = "GET";

const changelog = () => {
  const changelog = useRef("");

  async function makeHttpRequest() {
    const client = await getClient();

    const options = {
      url: "",
      method: httpMethod,
    };

    client
      .request(options)
      .then((value) => {
        if (value.status !== 200) {
         // changelog.current.value = "There is a issue with server connection";
        }// else changelog.current.value = value.data;
      })
      .catch((error) => {
      //  changelog.current.value = error;
      });
  }

  useEffect(() => {
    makeHttpRequest();
  });
  return (
      <TextField
        autoFocus
        margin="dense"
        multiline
        id="changelog"
        rows={10}
        inputRef={changelog}
        InputProps={{
          readOnly: true,
          style: {
            color: "white",
          },
        }}
        sx={{
          position: "fixed",
          left: 100,
        }}
      />
  );
}
