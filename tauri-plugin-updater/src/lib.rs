use tauri::{
  command,
  plugin::{Builder, TauriPlugin},
  AppHandle, Runtime,
};
use speedupdate::{
  metadata::Current,
  link::{
    RemoteRepository,
    AutoRepository,
    RepositoryError,
  },
};
use semver::Version;
use std::{collections::HashMap, sync::Mutex};

#[derive(serde::Deserialize)]
pub enum Update {
  Game,
  Launcher,
}

#[derive(serde::Serialize)]
pub enum UpdateErr {
  UpdateErr { description: String },
}

impl From<RepositoryError> for UpdateErr {
  fn from(error: RepositoryError) -> Self {
    Self::UpdateErr {
      description: error.to_string(),
    }
  }
}

#[derive(Default)]
struct MyState(Mutex<HashMap<String, String>>);

async fn latest_remote_version (
  repository_url: String,
  auth: Option<(&str, &str)>,
) -> Result<Current, UpdateErr> {
  let res = AutoRepository::new(repository_url.as_str(), auth)?;
  let remote_version = res.current_version().await?;
  Ok(remote_version)
}

#[command]
async fn update_available<R: Runtime>(
  app_handle: AppHandle<R>,
  repository_url: String,
  username: Option<String>,
  password: Option<String>,
  type_update: Update,
) -> Result<bool, UpdateErr> {
  let auth;
  match username {
    Some(ref user) => match password {
      Some(ref pass) => auth = Some((user.as_str(), pass.as_str())),
      None => auth = None,
    },
    None => auth = None,
  }
  let local_version = match type_update {
    Update::Launcher => &app_handle.package_info().version,
    Update::Game => &app_handle.package_info().version,
  };

  let remote_version = latest_remote_version(repository_url, auth).await;
  match remote_version {
    Ok(value) => {
      let remote_version_semver = Version::parse(value.version().as_str());
      let rv = remote_version_semver.unwrap().gt(local_version);
      Ok(rv)
    }
    Err(value) => Err(value),
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("updater")
    .invoke_handler(tauri::generate_handler![update_available])
    .build()
}
