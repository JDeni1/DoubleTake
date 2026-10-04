export const users = [
  {
    id: 1,
    name: "Alex",
    age: 21,
    bio: "CS student who loves music.",
    interests: ["Coding", "Music"],
    imageUrl: null
  },
];

export function getUserById(id) {
  return users.find((user) => user.id === Number(id));
}