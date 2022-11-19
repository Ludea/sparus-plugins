import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

// Icons
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

const Notifications = () => {

  const handleDisplayAlert = () => {
    alerts
      .filter((id) => !alertOpen.includes(id))
      .forEach((value) => {
        if (value) {
          setAlertOpen((prev) => [...prev, value]);
        }
      });
  }

  const handleDeleteAlert = (item: any) => {
    setAlertOpen((prev) => [...prev.filter((i) => i !== item)]);
  }

  return (
    <Stack>
      <TransitionGroup>
                  {alertOpen.map((alert: any, id: any) => (
                    <Collapse key={alert}>
                      <Alert
                        key={alert}
                        severity={alert.severity}
                        action={
                          alert.severity === "info" ? (
                            <>
                              {launcherState === "ready" ? (
                                <Button
                                  color="primary"
                                  size="small"
                                  onClick={() => relaunch()}
                                >
                                  Yes
                                </Button>
                              ) : null}
                              <LoadingButton
                                color="primary"
                                size="small"
                                loading={launcherState === "updatingLauncher"}
                                onClick={() => {
                                  setLauncherState("updatingLauncher");
                                  Load("launcher_url").then((url) => {
                                    invoke("update_workspace", {
                                      workspacePath: ".",
                                      repositoryUrl: url,
                                    }).then(() => {
                                      const arr = alerts;
                                      const index = arr.findIndex(
                                        (el) => el.severity === "info"
                                      );
                                      arr[index].message =
                                        "Update is ready. Do you wan to restart ?";
                                      setLauncherState("restart");
                                    });
                                  });
                                }}
                              >
                                Yes
                              </LoadingButton>
                              <Button
                                color="primary"
                                size="small"
                                onClick={() => handleDeleteAlert(alert)}
                              >
                                No
                              </Button>
                              {alerts.length > 1 && alertOpen.length === 1 ? (
                                <IconButton>
                                  <MoreHoriz />
                                </IconButton>
                              ) : null}
                              <IconButton
                                onClick={() => handleDeleteAlert(alert)}
                              >
                                <CloseIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              {alerts.length > 1 && alertOpen.length === 1 ? (
                                <IconButton onClick={handleDisplayAlert}>
                                  <MoreHoriz />
                                </IconButton>
                              ) : null}
                              <IconButton
                                onClick={() => handleDeleteAlert(alert)}
                              >
                                <CloseIcon />
                              </IconButton>
                            </>
                          )
                        }
                        sx={{
                          width: "75%",
                          zIndex: 1400,
                          bottom: id * 50 + 20,
                          left: 40,
                          position: "absolute",
                        }}
                      >
                        {alert.message}
                      </Alert>
                    </Collapse>
                  ))}
                </TransitionGroup>
              </Stack>
);
}

export default Notifications
