import { v4 as uuidv4 } from "uuid";

export default function testData() {
  const contacts = [
    {
      id: uuidv4(),
      Name: "Donald J Trump",
      Phone: "489-13-47",
      Email: "test@gmail.com",
      favourite: false,
    },
    {
      id: uuidv4(),
      Name: "Aaron Remsey",
      Phone: "2879631",
      Email: "test@gmail.com",
      favourite: false,
    },
    {
      id: uuidv4(),
      Name: "Rosie Simpson",
      Phone: "459-12-56",
      Email: "test@gmail.com",
      favourite: false,
    },
    {
      id: uuidv4(),
      Name: "Hermione Kline",
      Phone: "443-89-12",
      Email: "test@gmail.com",
      favourite: false,
    },
    {
      id: uuidv4(),
      Name: "Eden Clements",
      Phone: "645-17-79",
      Email: "test@gmail.com",
      favourite: false,
    },
    {
      id: uuidv4(),
      Name: "Annie Copeland",
      Phone: "227-91-26",
      Email: "test@gmail.com",
      favourite: false,
    },
  ];
  return contacts;
}
