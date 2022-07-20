export default function ChampionData({ data }) {
  return (
    <>
      {data.map((champion) => (
        <h6 key={champion.id}>{champion.champion}</h6>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const username = context.params.username;

  const url =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:8080/champions/${username}`
      : `https://vinine-grandmaster.herokuapp.com/champions/${username}`;

  const res = await fetch(url);
  const data = await res.json();

  return { props: { data } };
}
