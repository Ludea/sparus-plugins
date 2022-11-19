"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var Stack_1 = require("@mui/material/Stack");
var Collapse_1 = require("@mui/material/Collapse");
var react_transition_group_1 = require("react-transition-group");
var Alert_1 = require("@mui/material/Alert");
var IconButton_1 = require("@mui/material/IconButton");
var Button_1 = require("@mui/material/Button");
// Icons
var MoreHoriz_1 = require("@mui/icons-material/MoreHoriz");
var Close_1 = require("@mui/icons-material/Close");
var Notifications = function () {
    var handleDisplayAlert = function () {
        alerts
            .filter(function (id) { return !alertOpen.includes(id); })
            .forEach(function (value) {
            if (value) {
                setAlertOpen(function (prev) { return __spreadArray(__spreadArray([], prev, true), [value], false); });
            }
        });
    };
    var handleDeleteAlert = function (item) {
        setAlertOpen(function (prev) { return __spreadArray([], prev.filter(function (i) { return i !== item; }), true); });
    };
    return (<Stack_1["default"]>
      <react_transition_group_1.TransitionGroup>
                  {alertOpen.map(function (alert, id) { return (<Collapse_1["default"] key={alert}>
                      <Alert_1["default"] key={alert} severity={alert.severity} action={alert.severity === "info" ? (<>
                              {launcherState === "ready" ? (<Button_1["default"] color="primary" size="small" onClick={function () { return relaunch(); }}>
                                  Yes
                                </Button_1["default"]>) : null}
                              <LoadingButton color="primary" size="small" loading={launcherState === "updatingLauncher"} onClick={function () {
                    setLauncherState("updatingLauncher");
                    Load("launcher_url").then(function (url) {
                        invoke("update_workspace", {
                            workspacePath: ".",
                            repositoryUrl: url
                        }).then(function () {
                            var arr = alerts;
                            var index = arr.findIndex(function (el) { return el.severity === "info"; });
                            arr[index].message =
                                "Update is ready. Do you wan to restart ?";
                            setLauncherState("restart");
                        });
                    });
                }}>
                                Yes
                              </LoadingButton>
                              <Button_1["default"] color="primary" size="small" onClick={function () { return handleDeleteAlert(alert); }}>
                                No
                              </Button_1["default"]>
                              {alerts.length > 1 && alertOpen.length === 1 ? (<IconButton_1["default"]>
                                  <MoreHoriz_1["default"] />
                                </IconButton_1["default"]>) : null}
                              <IconButton_1["default"] onClick={function () { return handleDeleteAlert(alert); }}>
                                <Close_1["default"] />
                              </IconButton_1["default"]>
                            </>) : (<>
                              {alerts.length > 1 && alertOpen.length === 1 ? (<IconButton_1["default"] onClick={handleDisplayAlert}>
                                  <MoreHoriz_1["default"] />
                                </IconButton_1["default"]>) : null}
                              <IconButton_1["default"] onClick={function () { return handleDeleteAlert(alert); }}>
                                <Close_1["default"] />
                              </IconButton_1["default"]>
                            </>)} sx={{
                width: "75%",
                zIndex: 1400,
                bottom: id * 50 + 20,
                left: 40,
                position: "absolute"
            }}>
                        {alert.message}
                      </Alert_1["default"]>
                    </Collapse_1["default"]>); })}
                </react_transition_group_1.TransitionGroup>
              </Stack_1["default"]>);
};
exports["default"] = Notifications;
