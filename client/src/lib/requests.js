export async function getAllAutobots() {
  const res = await fetch('/api/autobots');
  const data = await res.json();

  console.log(data);
}
