
export default async function ProtectedRoute() {
  return (
    <div className="mx-auto pt-6">
      This is a protected route.
      <br />
      You will only see this if you are authenticated.
    </div>
  );
}
