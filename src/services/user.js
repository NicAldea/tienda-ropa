const userDetail = {
    name: "Nicolás",
    lastname: "Aldea",
    email: "nicolas.aldea@duoc.cl",
    profilePicture: "/img/banner-tienda.svg",
    birthDate: "28/01/2001",
    memberSince: "2026",
    totalOrders: 4,
    favoriteCategory: "Ropa Hombre"
}

export function getUserProfile() {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(userDetail);
    }, 500);
  });
}