async function fetchFavorite(id: string) {
  return fetch('https://jsonplaceholder.typicode.com/todos/' + id).then(
    (response) => response.json(),
  );
}

export default async function FavoriteDetailPage(props: {
  params: Promise<{ favoriteId: string }>;
  searchParams: Promise<{ message: string }>;
}) {
  const params = await props.params;
  const favorite = await fetchFavorite(params.favoriteId);
  const searchParams = await props.searchParams;

  return (
    <div>
      <h1>Favorite Detail Page</h1>
      <p>Favorite detail page content</p>
      <pre>
        <code>{JSON.stringify(favorite, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(searchParams, null, 2)}</code>
      </pre>
    </div>
  );
}
