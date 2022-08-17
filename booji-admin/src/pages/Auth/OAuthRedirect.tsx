import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLoginGithub } from "@/hooks/user";

const OAuthRedirect = () => {
  const [searchParams] = useSearchParams();

  const { login } = useLoginGithub();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;
    login(code);
  }, [searchParams]);
  return <div>redirect...</div>;
};

export default OAuthRedirect;
