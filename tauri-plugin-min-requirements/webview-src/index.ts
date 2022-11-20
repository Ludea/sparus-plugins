interface GPU {
  name: string;
  canrungame: boolean;
}

interface CPU {
  frequency: number;
  core: number;
  canrungame: boolean;
}

invoke<GPU>("list_available_gpu")
      .then((value) => {
        if (!value.canrungame) {
          setAlerts((previous: any) => [
            ...previous,
            {
              severity: "warning",
              message: `The minimum is NVIDIA GTX 970 and you have ${value.name}`,
            },
          ]);
        }
      })
      .catch((error) => {
        setAlerts((previous: any) => [
          ...previous,
          { severity: "error", message: error },
        ]);
      });

    invoke<CPU>("list_cpu_model")
      .then((value: any) => {
        if (!value.canrungame) {
          if (value.core < 4) {
            setAlerts((previous: any) => [
              ...previous,
              {
                severity: "warning",
                message: `The minimum of CPU core is 4 and you have only ${value.core}`,
              },
            ]);
          }
          if (value.frequency <= 2500) {
            setAlerts((previous: any) => [
              ...previous,
              {
                severity: "warning",
                message: `The minimum of CPU frequency is 2.5Ghz and you have only ${
                  Math.floor(value.frequency / 100) / 10
                }GHz`,
              },
            ]);
          }
        }
      })
      .catch((error) => {
        setAlerts((previous: any) => [
          ...previous,
          { severity: "error", message: error },
        ]);
      });
