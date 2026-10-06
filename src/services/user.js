const userDetail = {
    name: "Alfredo",
    lastname: "Solis",
    email: "x_alfredo_x@hotmail.com",
    profilePicture: "https://res.cloudinary.com/postedin/image/upload/d_mascotas:no-image.jpg,f_auto,q_80/mascotas/c-postedin-image-36428.jpeg",
    birthDate: "25/09/2000",
    profileLevel: 32,
    accountBalance: 26500,
    favoriteGame: {}
}

export function getUserProfile() {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(userDetail);
    }, 1000);
  });
}