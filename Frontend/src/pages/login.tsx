import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const { data } = useSession();
  return (
    <div>
      <span>{JSON.stringify(data?.user)}</span>
      Login
      <br />
      {data ? (
        <>
          <p>Welcome {data.user?.name}</p>
          <button type="button" onClick={() => signOut()}>
            Sign ou
          </button>
        </>
      ) : (
        <button type="button" onClick={() => signIn()}>
          Sign in
        </button>
      )}
    </div>
  );
};

export default Login;
