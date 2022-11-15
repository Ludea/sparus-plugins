use tauri::{
  command,
  plugin::{Builder, TauriPlugin},
  Runtime,
};
use sysinfo::{CpuExt, System, SystemExt};
use serde::Serialize;

#[derive(Serialize)]
pub struct Gpu {
  name: String,
  canrungame: bool,
}

#[derive(Serialize)]
pub struct Cpu {
  frequency: u64,
  core: usize,
  canrungame: bool,
}

#[command]
fn get_total_memory() -> u64 {
  let sys = System::new_all();
  sys.total_memory() / (1024 * 1024)
}

#[command]
fn list_available_gpu() -> Gpu {
  let instance = wgpu::Instance::new(wgpu::Backends::all());
  let mut graphical_model: Gpu = Gpu {
    name: "".to_string(),
    canrungame: false,
  };
  let adapter = instance
    .enumerate_adapters(wgpu::Backends::all())
    .find(|gpu| gpu.get_info().device_type == wgpu::DeviceType::DiscreteGpu);
  // .next()
  match adapter {
    Some(gpu) => {
      if gpu.get_info().name.contains("NVIDIA GeForce GTX") {
        if get_nvidia_model(gpu.get_info().name.replacen("NVIDIA GeForce GTX ", "", 1)) < 970 {
          graphical_model = Gpu {
            name: gpu.get_info().name,
            canrungame: false,
          };
        } else {
          graphical_model = Gpu {
            name: gpu.get_info().name,
            canrungame: true,
          };
        }
      }
      if gpu.get_info().name.contains("AMD") {
        if get_amd_model(gpu.get_info().name.replacen("AMD", "", 1)) < 570 {
          graphical_model = Gpu {
            name: gpu.get_info().name,
            canrungame: false,
          };
        } else {
          graphical_model = Gpu {
            name: gpu.get_info().name,
            canrungame: true,
          };
        }
      }
    }
    None => {
      graphical_model = Gpu {
        name: "no dedicated GPU".to_string(),
        canrungame: false,
      }
    }
  }
  graphical_model
}

fn get_nvidia_model(gpu: String) -> i32 {
  let model: i32;
  if gpu.contains('M') {
    model = gpu.replacen('M', "", 1).parse().expect("Wanted a number");
  } else if gpu.contains("Ti") {
    model = gpu.replacen("Ti", "", 1).parse().expect("Wanted a number");
  } else {
    model = gpu.parse().expect("Wanted a number");
  }
  model
}

fn get_amd_model(gpu: String) -> i32 {
  let model: i32 = if gpu.contains("RX") {
    gpu.replacen("RX", "", 1).parse().expect("Wanted a number")
  } else {
    gpu.parse().expect("Wanted a number")
  };
  model
}

#[command]
fn list_cpu_model() -> Cpu {
  let mut sys = System::new();
  sys.refresh_all();
  let mut freq = 0;
  for cpu in sys.cpus() {
    freq = cpu.frequency();
  }
  if freq >= 2500 {
    Cpu {
      frequency: freq,
      core: sys.physical_core_count().unwrap(),
      canrungame: true,
    }
  } else {
    Cpu {
      frequency: freq,
      core: sys.physical_core_count().unwrap(),
      canrungame: false,
    }
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("min-requitements")
    .invoke_handler(tauri::generate_handler![get_total_memory, list_available_gpu, list_cpu_model])
    .build()
}
