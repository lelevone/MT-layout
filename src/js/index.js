async function asnc() {
  const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await resp.json();
  console.log(data);
}
class Button{
  static btn = ""
}
asnc();