
export function signIn(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === "password1234") {
        resolve({ username: username, token: "sadjsagdhsgdsadsdjksagd" });
      } else {
        reject(new Error("Credenciales inválidas"));
      }
    }, 1000);
  });
}